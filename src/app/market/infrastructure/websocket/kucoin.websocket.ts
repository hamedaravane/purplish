import {inject, Injectable} from "@angular/core";
import {WebsocketAbstract} from "@shared/abstract/websocket.abstract";
import {firstValueFrom} from "rxjs";
import {KucoinInfra} from "@market/infrastructure/kucoin.infra";
import {KucoinWebsocketMessage} from "@market/entity/kucoin.entity";
import {MarketStore} from '@market/store/market.store';
import {environment} from "@environment";

@Injectable({
  providedIn: "root"
})
export class KucoinWebsocket extends WebsocketAbstract {
  protected endpoint!: string;
  private readonly kucoinInfra = inject(KucoinInfra);
  private readonly marketStore = inject(MarketStore);

  async init() {
    const bulletResponse = await firstValueFrom(this.kucoinInfra.getKucoinPublicBulletResponse());
    this.endpoint = environment.kucoinStreamBaseUrl + bulletResponse.data.token;
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
      this.marketStore.kucoinCurrencyMap.set(message.data!.data.baseCurrency, message.data!.data);
      this.marketStore.kucoinWebsocketMarketSubject.next(this.marketStore.kucoinCurrencyMap);
    }
  }

  protected override onComplete(): void {
    console.log('in this moment the subscription to kucoin websocket ended!')
  }

  protected override onError(err: Error): void {
    console.warn('in kucoin websocket error happened!');
    this.disconnect();
    this.init().then();
  }
}
