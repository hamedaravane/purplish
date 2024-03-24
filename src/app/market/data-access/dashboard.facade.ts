import {inject, Injectable} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {OmpfinexInfra} from '@market/infrastructure/ompfinex.infra';
import {KucoinWebsocket} from '@market/infrastructure/websocket/kucoin.websocket';
import {OmpfinexWebsocket} from '@market/infrastructure/websocket/ompfinex.websocket';
import {MarketStore} from '@market/store/market.store';

@Injectable({
  providedIn: 'root'
})
export class DashboardFacade {
  private readonly ompfinexInfra = inject(OmpfinexInfra);
  private readonly kucoinWebSocket = inject(KucoinWebsocket);
  private readonly ompfinexWebsocket = inject(OmpfinexWebsocket);
  private readonly marketStore = inject(MarketStore);
  readonly intersectionMarket$ = this.marketStore.intersectionMarketSubject.asObservable();

  initWebSocket() {
    // this.getOmpfinexMarkets();
    this.ompfinexWebsocket.init();
    // this.kucoinWebSocket.init().then();
  }

  getOmpfinexMarkets() {
    firstValueFrom(this.ompfinexInfra.getOmpfinexMarkets()).then((res) => {
      this.marketStore.ompfinexMarketsDtoSubject.next(res);
      res.map((market) => {
        if (market.quote_currency.id === 'USDT') {
          this.marketStore.ompfinexMarketDtoMap.set(market.base_currency.id, market);
        }
      });
    });
  }
}
