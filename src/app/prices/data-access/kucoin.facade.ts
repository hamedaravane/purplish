import {inject, Injectable} from "@angular/core";
import {KucoinInfra} from "@prices/infrastructure/kucoin.infra";
import {firstValueFrom, Observable, Subject} from "rxjs";
import {
  KucoinInstanceServer, KucoinPublicBulletResponse,
  KucoinWebsocketMarketSnapshotData,
  KucoinWebsocketMessage
} from "@prices/data-access/kucoin.entity";
import {WebsocketAbstract} from "@shared/abstract/websocket.abstract";

@Injectable({
  providedIn: "root"
})
export class KucoinFacade extends WebsocketAbstract {
  private readonly kucoinInfra = inject(KucoinInfra);
  private kucoinPublicToken!: KucoinPublicBulletResponse;
  private instanceServer!: KucoinInstanceServer;
  private kucoinCurrencyMap = new Map<string, KucoinWebsocketMarketSnapshotData>();
  private kucoinMarketDataSubject = new Subject<Map<string, KucoinWebsocketMarketSnapshotData>>();
  public get kucoinMarketData$(): Observable<Map<string, KucoinWebsocketMarketSnapshotData>> {
    return this.kucoinMarketDataSubject.asObservable();
  }
  protected override onMessageReceived(msg: KucoinWebsocketMessage): void {
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
        break;
      case "pong":
        break;
      case "ack":
        setInterval(() => {
          this.sendMessage({id: msg.id, type: 'ping'})
        }, this.instanceServer.pingInterval - 10);
        break;
      case "message":
        if (msg.data) {
          this.kucoinCurrencyMap.set(msg.data.data.baseCurrency, msg.data);
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
    // await this._getKucoinMarketList();
    this.kucoinPublicToken = await firstValueFrom(this.kucoinInfra.getKucoinPublicTokenWebsocket());
    this.instanceServer = this.getInstanceServers(this.kucoinPublicToken.data.instanceServers);
    this.connect(`${this.instanceServer.endpoint}?token=${this.kucoinPublicToken.data.token}`);
  }
  /*private async _getKucoinMarketList() {
    const currencyListData = await firstValueFrom(this.kucoinInfra.getKucoinCurrencyList());
    currencyListData.data.map((market) => this.kucoinCurrenciesNameSet.add(market.currency));
  }*/
}
