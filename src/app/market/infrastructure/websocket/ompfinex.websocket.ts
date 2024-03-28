import {inject, Injectable} from "@angular/core";
import {environment} from "@environment";
import {WebsocketAbstract} from "@shared/abstract/websocket.abstract";
import {convertOmpfinexMarketWebsocket, OmpfinexMarketWebsocketDto} from "@market/entity/ompfinex.entity";
import {MarketStore} from "@market/store/market.store";
import {combineLatest, map, of} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class OmpfinexWebsocket extends WebsocketAbstract {
  protected endpoint: string = environment.ompfinexStreamBaseUrl;
  private readonly marketStore = inject(MarketStore);

  init() {
    this.connect();
  }

  protected handleMessages(message: { data: OmpfinexMarketWebsocketDto[] }): void {
    combineLatest(
      [of(message.data), this.marketStore.ompfinexMarketsSubject]
    ).pipe(
      map(([wsData, markets]) => {
        return convertOmpfinexMarketWebsocket(wsData, markets);
      })
    )
  }

  protected onComplete(): void {
    console.log('ompfinex websocket closed');
  }

  protected onError(err: Error): void {
    console.log('in ompfinex websocket error happened', err);
  }
}
