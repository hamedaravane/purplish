import {inject, Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {OmpfinexFacade} from '@market/data-access/ompfinex.facade';
import {KucoinWebsocketMarketSnapshotData, KucoinWebsocketMessage} from '@market/entity/kucoin.entity';
import {KucoinWebsocket} from "@market/infrastructure/websocket/kucoin.websocket";

@Injectable({
  providedIn: "root"
})
export class KucoinFacade {
  private readonly kucoinWebSocket = inject(KucoinWebsocket);
  private readonly ompfinexFacade = inject(OmpfinexFacade);
  private readonly ompfinexCurrenciesMap = this.ompfinexFacade.ompfinexCurrenciesMapGetter;
  private kucoinCurrencyMap = new Map<string, KucoinWebsocketMarketSnapshotData>();
  private kucoinMarketDataSubject = new Subject<Map<string, KucoinWebsocketMarketSnapshotData>>();
  readonly kucoinIconPath = this.kucoinWebSocket.kucoinIconPath;
  public get kucoinMarketData$(): Observable<Map<string, KucoinWebsocketMarketSnapshotData>> {
    return this.kucoinMarketDataSubject.asObservable();
  }
  protected onMessageReceived(msg: KucoinWebsocketMessage): void {
    switch (msg.type) {
      case "welcome":
        this.sendMessage(
          {
            id: msg.id,
            type: 'subscribe',
            topic: '/market/snapshot:USDS',
            response: true
          }
        )
        setInterval(() => {
          this.sendMessage({id: msg.id, type: 'ping'})
        }, this.instanceServer.pingTimeout - 100);
        break;
      case "pong":
        break;
      case "ack":
        break;
      case "message":
        if (this.ompfinexCurrenciesMap.has(msg.data!.data.baseCurrency)) {
          this.kucoinCurrencyMap.set(msg.data!.data.baseCurrency, msg.data!);
          this.kucoinMarketDataSubject.next(this.kucoinCurrencyMap)
        }
        break;
    }
  }

  initWebSocket() {
    this.kucoinWebSocket.init().then();
  }
}
