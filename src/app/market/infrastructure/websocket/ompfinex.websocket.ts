import {inject, Injectable} from "@angular/core";
import {WebsocketAbstract} from "@shared/abstract/websocket.abstract";
import {OmpfinexInfra} from "@market/infrastructure/ompfinex.infra";
import {Subject} from "rxjs";
import {ompfinexMarketData, ompfinexWebsocketMessage} from "@market/entity/ompfinex.entity";

@Injectable({
  providedIn: "root"
})
export class OmpfinexWebsocket extends WebsocketAbstract {
  private readonly ompfinexInfra = inject(OmpfinexInfra);
  protected endpoint: string = this.ompfinexInfra.ompfinexWebsocketApiBaseUrl;
  private readonly messageSubject = new Subject<ompfinexMarketData[]>();
  messages$ = this.messageSubject.asObservable();
  private webSocketId = 1;

  init() {
    this.connect();
    this.sendMessage({connect: {name: "js"}, id: this.webSocketId++})
    this.subscribeToChannel('public-market:r-price-ag');
  }

  protected handleMessages(message: ompfinexWebsocketMessage): void {
    this.messageSubject.next(message.push!.pub.data.data);
  }

  protected override onComplete(): void {
    console.log('in this moment the subscription to ompfinex websocket ended!')
  }

  protected override onError(err: Error): void {
    console.warn('in ompfinex websocket error happened!')
  }

  private subscribeToChannel(channel: string) {
    this.sendMessage({
      subscribe: {
        channel: channel
      },
      id: this.webSocketId++
    })
  }
}
