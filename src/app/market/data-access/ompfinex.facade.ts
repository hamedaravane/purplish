import {inject, Injectable} from "@angular/core";
import {OmpfinexWebsocket} from "@market/infrastructure/websocket/ompfinex.websocket";
import {OmpfinexMarketDto} from "@market/entity/ompfinex.entity";

@Injectable({
  providedIn: "root"
})
export class OmpfinexFacade {
  private readonly ompfinexWebsocket = inject(OmpfinexWebsocket);
  ompfinexMarkets!: OmpfinexMarketDto[];

  init() {
    this.ompfinexWebsocket.init();
  }

  /*ompfinexMarketWebsocket$ = this.ompfinexWebsocket.messages$.pipe(
    map((markets) => {
      let result = new Array<OmpfinexMarket>();
      markets.map((market) => {
        const foundMarket = this.ompfinexMarkets.find((_market) => _market.id === market.m)
        if (foundMarket) {
          result.push({
            id: foundMarket.id,
            baseCurrencyId: foundMarket.base_currency.id,
            baseCurrencyIconPath: foundMarket.base_currency.icon_path,
            baseCurrencyName: foundMarket.base_currency.name,
            quoteCurrencyId: foundMarket.quote_currency.id,
            quoteCurrencyIconPath: foundMarket.quote_currency.icon_path,
            quoteCurrencyName: foundMarket.quote_currency.name,
            price: market.price,
            volume: market.v,
          })
        }
      })
      return result;
    })
  );*/
}
