import {WebsocketAbstract} from "@shared/abstract/websocket.abstract";
import {MarketStore} from "@market/store/market.store";
import {inject, Injectable} from "@angular/core";
import {filter, map} from "rxjs";
import {environment} from "@environment";
import {BinanceSocket, BinanceStreamData, convertToBinanceDto} from "@market/entity/binance.entity";

@Injectable({
  providedIn: 'root'
})
export class BinanceWebsocket extends WebsocketAbstract{
  private _marketStore = inject(MarketStore)
  private _binanceMarketMap = new Map<string, BinanceStreamData>()
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
        this.connect()
      })
  }
  protected handleMessages(message: BinanceSocket): void {
    const binanceMarketData = convertToBinanceDto(message)
    this._binanceMarketMap.set(binanceMarketData.symbol.slice(0,binanceMarketData.symbol.indexOf('USDT')), binanceMarketData)
    this._marketStore.binanceMarketDtoMapSubject.next(this._binanceMarketMap)
  }

  protected onComplete(): void {
  }

  protected override onError(err: Error): void {
    this.disconnect();
    this.init()
  }

}
