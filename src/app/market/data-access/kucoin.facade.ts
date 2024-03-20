import {inject, Injectable} from "@angular/core";
import {KucoinWebsocket} from '@market/infrastructure/websocket/kucoin.websocket';
import {MarketData} from '@market/entity/kucoin.entity';
import {map} from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class KucoinFacade {
  private readonly kucoinWebSocket = inject(KucoinWebsocket);
  private kucoinCurrencyMap = new Map<string, MarketData>();
  readonly kucoinIconPath = this.kucoinWebSocket.kucoinIconPath;

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
