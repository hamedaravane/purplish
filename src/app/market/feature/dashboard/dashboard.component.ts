import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, DecimalPipe, NgOptimizedImage, NgTemplateOutlet} from "@angular/common";
import {DashboardFacade} from '@market/data-access/dashboard.facade';
import numberAnimation from "@market/util/number.animation";
import {MarketStore} from "@market/store/market.store";
import {combineLatest, map, Observable} from "rxjs";
import {environment} from "@environment";
import {Big} from "big.js";
import {IntersectedMarket} from "@market/entity/market.entity";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgOptimizedImage,
    AsyncPipe,
    NgTemplateOutlet,
    DecimalPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  animations: [numberAnimation]
})
export class DashboardComponent implements OnInit {
  private readonly dashboardFacade = inject(DashboardFacade);
  private readonly marketStore = inject(MarketStore);
  intersectedMarkets$!: Observable<IntersectedMarket[]>;

  ngOnInit() {
    this.dashboardFacade.initWebSocket();
    this.intersectedMarkets$ = combineLatest([
      this.marketStore.ompfinexMarketsWebSocketSubject, this.marketStore.kucoinWebsocketMarketSubject
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
            diffPrice: kucoinFound ? Big(market.price).minus(kucoinFound.lastTradedPrice).toNumber() : null,
            diffPricePercent: kucoinFound ? Big(Big(market.price).minus(kucoinFound.lastTradedPrice)).div(kucoinFound.lastTradedPrice).times(100).toNumber() : null
          }
        } as IntersectedMarket
      })
    }))
  }
}
