import {inject, Injectable} from "@angular/core";
import {WebsocketAbstract} from "@shared/abstract/websocket.abstract";
import {firstValueFrom, Observable, Subject} from "rxjs";
import {KucoinInfra} from "@market/infrastructure/kucoin.infra";
import {KucoinPublicBulletResponse, KucoinWebsocketMessage, MarketData} from "@market/entity/kucoin.entity";
import {MarketStore} from '@market/store/market.store';

@Injectable({
  providedIn: "root"
})
export class KucoinWebsocket extends WebsocketAbstract {
  protected endpoint!: string;
  private readonly kucoinInfra = inject(KucoinInfra);
  private readonly marketStore = inject(MarketStore);
  private readonly messageSubject = new Subject<MarketData>();
  messages$: Observable<MarketData> = this.messageSubject.asObservable();
  kucoinCurrencyMap = this.marketStore.kucoinCurrencyMap;
  ompfinexCurrencyMap = this.marketStore.ompfinexCurrencyMap;
  kucoinWebsocketMarketSubject = this.marketStore.kucoinWebsocketMarketSubject;

  async init() {
    const bulletResponse = await firstValueFrom(this.kucoinInfra.getKucoinPublicBulletResponse());
    this.endpoint = this.kucoinInfra.kucoinWebsocketSpotBaseUrl + bulletResponse;
    const instanceServer = bulletResponse.data.instanceServers.reduce(previousValue => previousValue);
    const pingMessage = {type: 'ping'};
    this.connect();
    this.keepAlive(instanceServer.pingInterval, pingMessage, instanceServer.pingTimeout);
  }

  protected override handleMessages(message: KucoinWebsocketMessage): void {
    if (message.type === "welcome") {
      this.sendMessage(
        {
          id: message.id,
          type: 'subscribe',
          topic: '/market/snapshot:USDS',
          response: true
        }
      )
    }
    if (message.type === "message") {
      if (this.ompfinexCurrencyMap.has(message.data!.data.baseCurrency)) {
        this.kucoinCurrencyMap.set(message.data!.data.baseCurrency, message.data!.data);
        this.kucoinWebsocketMarketSubject.next(this.kucoinCurrencyMap);
      }
      this.messageSubject.next(message.data!.data);
    }
  }

  protected override onComplete(): void {
    console.log('in this moment the subscription to kucoin websocket ended!')
  }

  protected override onError(err: Error): void {
    console.warn('in kucoin websocket error happened!')
  }
}
