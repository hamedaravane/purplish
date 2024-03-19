import {inject, Injectable} from "@angular/core";
import {WebsocketAbstract} from "@shared/abstract/websocket.abstract";
import {firstValueFrom, Observable, Subject} from "rxjs";
import {KucoinInfra} from "@market/infrastructure/kucoin.infra";
import {KucoinPublicBulletResponse, KucoinWebsocketMessage, MarketData} from "@market/entity/kucoin.entity";

@Injectable({
  providedIn: "root"
})
export class KucoinWebsocket extends WebsocketAbstract {
  protected endpoint!: string;
  private readonly kucoinInfra = inject(KucoinInfra);
  kucoinIconPath = this.kucoinInfra.kucoinIconPath;
  private bulletResponse!: KucoinPublicBulletResponse;
  private readonly messageSubject = new Subject<MarketData>();
  messages$: Observable<MarketData> = this.messageSubject.asObservable();

  async init() {
    this.bulletResponse = await firstValueFrom(this.kucoinInfra.getKucoinPublicBulletResponse());
    this.endpoint = this.kucoinInfra.kucoinWebsocketSpotBaseUrl + this.bulletResponse;
    const instanceServer = this.bulletResponse.data.instanceServers.reduce(previousValue => previousValue);
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
      this.messageSubject.next(message.data!.data);
    }
  }

  protected onComplete(): void {
    console.log('in this moment the subscription to kucoin websocket ended!')
  }

  protected onError(err: Error): void {
    console.warn('in kucoin websocket error happened!')
  }
}
