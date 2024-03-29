import {inject, Injectable} from '@angular/core';
import {KucoinWebsocket} from '@market/infrastructure/websocket/kucoin.websocket';
import {OmpfinexWebsocket} from '@market/infrastructure/websocket/ompfinex.websocket';
import {MarketStore} from '@market/store/market.store';
import {BinanceWebsocket} from "@market/infrastructure/websocket/binance.websocket";

@Injectable({
  providedIn: 'root'
})
export class DashboardFacade {
  private readonly marketStore = inject(MarketStore);
  private readonly ompfinexWebsocket = inject(OmpfinexWebsocket);
  private readonly kucoinWebsocket = inject(KucoinWebsocket);
  private readonly binanceWebsocket = inject(BinanceWebsocket);

  initWebSocket() {
    this.ompfinexWebsocket.init();
    this.kucoinWebsocket.getBulletResponse().then(() => {
      this.kucoinWebsocket.init();
    });
    // this.binanceWebsocket.init();
  }
}
