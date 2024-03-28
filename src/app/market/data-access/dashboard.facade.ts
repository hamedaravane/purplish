import {inject, Injectable} from '@angular/core';
import {OmpfinexInfra} from '@market/infrastructure/ompfinex.infra';
import {KucoinWebsocket} from '@market/infrastructure/websocket/kucoin.websocket';
import {OmpfinexWebsocket} from '@market/infrastructure/websocket/ompfinex.websocket';
import {MarketStore} from '@market/store/market.store';
import {BinanceWebsocket} from "@market/infrastructure/websocket/binance.websocket";
import {combineLatest, firstValueFrom, map} from "rxjs";
import {Big} from 'big.js';
import {IntersectedMarket} from "@market/entity/market.entity";
import {environment} from "@environment";

@Injectable({
  providedIn: 'root'
})
export class DashboardFacade {
  private readonly marketStore = inject(MarketStore);
  private readonly ompfinexInfra = inject(OmpfinexInfra);
  private readonly ompfinexWebsocket = inject(OmpfinexWebsocket);
  private readonly kucoinWebsocket = inject(KucoinWebsocket);
  private readonly binanceWebsocket = inject(BinanceWebsocket);

  getOmpfinexMarkets() {
    firstValueFrom(this.ompfinexInfra.getOmpfinexMarkets()).then((markets) => {
      this.marketStore.ompfinexMarketsSubject.next(markets);
    });
  }

  initWebSocket() {
    this.ompfinexWebsocket.init();
    this.kucoinWebsocket.init().then();
    // this.binanceWebsocket.init();
  }

  combineMarkets() {
    this.marketStore.intersectedMarkets$ = combineLatest([
      this.marketStore.ompfinexMarketsWebSocket$, this.marketStore.kucoinWebsocketMarketSubject
    ]).pipe(map(([omp, kucoin]) => {
      return omp.map((market) => {
        const kucoinFound = kucoin.get(market.currencyId);
        return {
          id: market.id,
          currencyId: market.currencyId,
          currencyName: market.currencyName,
          iconPath: market.iconPath,
          name: market.name,
          ompfinex: {
            exchangeIcon: '',
            timestamp: market.timestamp,
            volume: +market.volume,
            price: +market.price
          },
          kucoin: {
            exchangeIcon: environment.kucoinIconPath,
            price: kucoinFound ? kucoinFound.lastTradedPrice : null,
            volume: kucoinFound ? kucoinFound.vol : null,
            diffPrice: kucoinFound ? Big(market.price).minus(kucoinFound.lastTradedPrice).toNumber() : null
          }
        } as IntersectedMarket
      })
    }))
  }
}
