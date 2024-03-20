import {inject, Injectable} from "@angular/core";
import {MarketStore} from '@market/store/market.store';
import {map} from 'rxjs';
import {KucoinWebsocket} from '@market/infrastructure/websocket/kucoin.websocket';
import {MarketData} from '@market/entity/kucoin.entity';

@Injectable({
  providedIn: "root"
})
export class KucoinFacade {
  private readonly kucoinWebSocket = inject(KucoinWebsocket);
  private kucoinCurrencyMap = new Map<string, MarketData>();

  kucoinMarketDataMap$ = this.kucoinWebSocket.messages$.pipe(
    map(value => {
      this.kucoinCurrencyMap.set(value.baseCurrency, value);
      return this.kucoinCurrencyMap;
    })
  );

  initWebSocket() {
    this.kucoinWebSocket.init().then();
  }
}
