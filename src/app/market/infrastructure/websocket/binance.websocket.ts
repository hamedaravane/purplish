import {WebsocketAbstract} from "@shared/abstract/websocket.abstract";
import {MarketStore} from "@market/store/market.store";
import {inject, Injectable} from "@angular/core";
import {filter, map} from "rxjs";
import {environment} from "@environment";

@Injectable({
  providedIn: 'root'
})
export class BinanceWebsocket extends WebsocketAbstract{
  private _marketStore = inject(MarketStore)
  protected endpoint!: string;


  init(){
    this.endpoint = 'wss://stream.binance.com:9443/stream'
    this._marketStore.ompfinexMarketsDtoSubject
      .pipe(
        map(markets => markets.filter(market => market.quote_currency.id === 'USDT')),
        map(markets => markets.map(market => market.base_currency.id.toLowerCase() + market.quote_currency.id.toLowerCase()))
      )
      .subscribe(markets => {
        this.endpoint = environment.binanceStreamBaseUrl + '?streams='
        markets.forEach((market, index) => {
          if (index === 0) {
            this.endpoint = this.endpoint + market + '@trade'
          } else {
            this.endpoint = this.endpoint + '/' + market + '@trade'
          }
        })
        console.log(this.endpoint)
        this.connect()
      })
  }
  protected handleMessages(message: any): void {
    console.log(message)
  }

  protected onComplete(): void {
  }

  protected override onError(err: Error): void {
    this.disconnect();
    this.init()
  }

}
