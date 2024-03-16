import { inject, Injectable } from "@angular/core";
import { KucoinInfra } from "@prices/infrastructure/kucoin.infra";
import { firstValueFrom, Observable, Subject } from "rxjs";
import {
  KucoinInstanceServer, KucoinPublicBulletResponse,
  KucoinWebsocketMarketSnapshotData,
  KucoinWebsocketMessage
} from "@prices/data-access/entity/kucoin.entity";
import { WebsocketAbstract } from "@shared/abstract/websocket.abstract";
import { OmpfinexFacade } from '@prices/data-access/ompfinex.facade';

@Injectable({
  providedIn: "root"
})
export class KucoinFacade {
  private websocketAbstract = new WebsocketAbstract();
  private readonly kucoinInfra = inject(KucoinInfra);
  private readonly ompfinexFacade = inject(OmpfinexFacade);
  private readonly ompfinexCurrenciesMap = this.ompfinexFacade.ompfinexCurrenciesMapGetter;
  private instanceServer!: KucoinInstanceServer;
  private kucoinCurrencyMap = new Map<string, KucoinWebsocketMarketSnapshotData>();
  private kucoinMarketDataSubject = new Subject<Map<string, KucoinWebsocketMarketSnapshotData>>();
  readonly kucoinIconPath = this.kucoinInfra.kucoinIconPath;
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
  public createKucoinWebsocketConnection(): void {
    this._createKucoinWebsocketConnection().then();
  }
  private getInstanceServers(array: KucoinInstanceServer[]) {
    return array.reduce(previousValue => {
      return {
        endpoint: previousValue.endpoint,
        pingInterval: previousValue.pingInterval,
        encrypt: previousValue.encrypt,
        protocol: previousValue.protocol,
        pingTimeout: previousValue.pingTimeout
      }
    })
  }
  private async _createKucoinWebsocketConnection() {
    const token = await firstValueFrom(this.kucoinInfra.getKucoinPublicTokenWebsocket());
    this.instanceServer = this.getInstanceServers(token.data.instanceServers);
    this.websocketAbstract.connect(`${this.instanceServer.endpoint}?token=${token.data.token}`);
  }
}
