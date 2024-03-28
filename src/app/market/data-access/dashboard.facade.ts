import {inject, Injectable} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {OmpfinexInfra} from '@market/infrastructure/ompfinex.infra';
import {KucoinWebsocket} from '@market/infrastructure/websocket/kucoin.websocket';
import {OmpfinexWebsocket} from '@market/infrastructure/websocket/ompfinex.websocket';
import {MarketStore} from '@market/store/market.store';
import {BinanceWebsocket} from "@market/infrastructure/websocket/binance.websocket";

@Injectable({
  providedIn: 'root'
})
export class DashboardFacade {
  private readonly ompfinexInfra = inject(OmpfinexInfra);
  private readonly kucoinWebsocket = inject(KucoinWebsocket);
  private readonly ompfinexWebsocket = inject(OmpfinexWebsocket);
  private readonly binanceWebsocket = inject(BinanceWebsocket)
  private readonly marketStore = inject(MarketStore);
  readonly intersectionMarket$ = this.marketStore.intersectionMarketSubject.asObservable();

  initWebSocket() {
    this.ompfinexWebsocket.init();
    this.kucoinWebsocket.init().then();
    this.binanceWebsocket.init();
  }

  getOmpfinexMarkets() {
    this.marketStore.ompfinexMarkets$ = this.ompfinexInfra.getOmpfinexMarkets();
  }
}
