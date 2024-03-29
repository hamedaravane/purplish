import {inject, Injectable} from "@angular/core";
import {environment} from "@environment";
import {WebsocketAbstract} from "@shared/abstract/websocket.abstract";
import {
  convertOmpfinexMarketWebsocket,
  OmpfinexMarket,
  OmpfinexMarketWebsocketDto
} from "@market/entity/ompfinex.entity";
import {MarketStore} from "@market/store/market.store";
import {OmpfinexInfra} from "@market/infrastructure/ompfinex.infra";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class OmpfinexWebsocket extends WebsocketAbstract {
  protected endpoint: string = environment.ompfinexStreamBaseUrl;
  private readonly marketStore = inject(MarketStore);
  private readonly ompfinexInfra = inject(OmpfinexInfra);
  private ompfinexMarkets!: OmpfinexMarket[];

  init() {
    firstValueFrom(this.ompfinexInfra.getOmpfinexMarkets()).then((markets) => {
      this.ompfinexMarkets = markets;
      this.connect();
    })
  }

  protected handleMessages(message: { data: OmpfinexMarketWebsocketDto[] }): void {
    this.marketStore.ompfinexMarketsWebSocketSubject.next(convertOmpfinexMarketWebsocket(message.data, this.ompfinexMarkets))
  }

  protected onComplete(): void {
    console.log('ompfinex websocket closed');
  }

  protected onError(err: Error): void {
    console.log('in ompfinex websocket error happened', err);
  }
}
