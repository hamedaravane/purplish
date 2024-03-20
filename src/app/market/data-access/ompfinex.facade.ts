import {inject, Injectable} from "@angular/core";
import {OmpfinexWebsocket} from "@market/infrastructure/websocket/ompfinex.websocket";
import {OmpfinexCurrency, OmpfinexMarket, OmpfinexMarketDto} from "@market/entity/ompfinex.entity";
import {OmpfinexInfra} from "@market/infrastructure/ompfinex.infra";
import {firstValueFrom, map} from "rxjs";


@Injectable({
  providedIn: "root"
})
export class OmpfinexFacade {
  ompfinexCurrencies!: OmpfinexCurrency[];
  private readonly ompfinexInfra = inject(OmpfinexInfra);
  ompfinexMarkets!: OmpfinexMarketDto[];
  private readonly ompfinexWebsocket = inject(OmpfinexWebsocket);
  ompfinexMarketWebsocket$ = this.ompfinexWebsocket.messages$.pipe(
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
  );

  getOmpfinexCurrencies() {
    firstValueFrom(this.ompfinexInfra.getOmpfinexCurrencies()).then((res) => {
      this.ompfinexCurrencies = res;
    });
  }

  getOmpfinexMarkets() {
    firstValueFrom(this.ompfinexInfra.getOmpfinexMarkets()).then((res) => {
      this.ompfinexMarkets = res;
    });
  }

  initWebSocket() {
    this.getOmpfinexCurrencies();
    this.getOmpfinexMarkets();
    this.ompfinexWebsocket.init();
  }
}
