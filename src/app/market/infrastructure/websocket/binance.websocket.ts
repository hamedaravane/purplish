import {WebsocketAbstract} from "@shared/abstract/websocket.abstract";
import {MarketStore} from "@market/store/market.store";
import {inject, Injectable} from "@angular/core";
import {environment} from "@environment";
import {BinanceSocket, BinanceStreamData, convertToBinanceDto} from "@market/entity/binance.entity";

@Injectable({
  providedIn: 'root'
})
export class BinanceWebsocket extends WebsocketAbstract{
  private marketStore = inject(MarketStore)
  private binanceMarketMap = new Map<string, BinanceStreamData>()
  protected endpoint: string = environment.binanceStreamBaseUrl;


  init(){
    /*this.marketStore.ompfinexMarketsDtoSubject
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
      })*/
  }
  protected handleMessages(message: BinanceSocket): void {
    const binanceMarketData = convertToBinanceDto(message)
    this.binanceMarketMap.set(binanceMarketData.symbol.slice(0, binanceMarketData.symbol.indexOf('USDT')), binanceMarketData)
    this.marketStore.binanceMarketDtoMapSubject.next(this.binanceMarketMap)
  }

  protected onComplete(): void {
  }

  protected override onError(err: Error): void {
    this.disconnect();
    // this.init()
  }
}
