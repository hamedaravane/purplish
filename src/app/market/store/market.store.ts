import {Injectable} from '@angular/core';
import {combineLatest, map, Subject} from 'rxjs';
import {OmpfinexMarketDto, ompfinexResponseWS} from '@market/entity/ompfinex.entity';
import {MarketData} from '@market/entity/kucoin.entity';
import {environment} from "@environment";

@Injectable({
  providedIn: 'root'
})
export class MarketStore {
  readonly kucoinIconPath = environment.kucoinIconPath;
  readonly kucoinCurrencyMap = new Map<string, MarketData>();
  readonly kucoinWebsocketMarketSubject = new Subject<Map<string, MarketData>>();
  readonly ompfinexMarketsDtoSubject = new Subject<OmpfinexMarketDto[]>();
  readonly ompfinexMarketDtoMap = new Map<string, OmpfinexMarketDto>();
  readonly ompfinexMarketResponseWSSubject = new Subject<ompfinexResponseWS>();
  readonly intersectionMarketMap = new Map<string, any>();
  readonly intersectionMarketSubject = new Subject<Map<string, any>>();
  readonly intersection$ = combineLatest(
    [this.kucoinWebsocketMarketSubject]
  ).pipe(
    map(([kucoinWS]) => {
      let kucoinWSCustomData;
      kucoinWS.forEach((value, key) => {
        if (!this.ompfinexMarketDtoMap.has(key)) {
          kucoinWS.delete(key);
        } else {
          kucoinWSCustomData = {
            symbol: value.symbol,
            buy: value.buy,
            sell: value.sell,
            sort: value.sort,
            volValue: value.volValue,
            baseCurrency: value.baseCurrency,
            symbolCode: value.symbolCode,
            datetime: value.datetime,
            high: value.high,
            vol: value.vol,
            low: value.low,
            changePrice: value.changePrice,
            changeRate: value.changeRate,
            lastTradedPrice: value.lastTradedPrice,
            exchange: 'kucoin',
            exchangeIcon: this.kucoinIconPath
          }
          this.intersectionMarketMap.set(key, {
            currencyId: key,
            currencyIconPath: this.ompfinexMarketDtoMap.get(key)!.base_currency.icon_path,
            currencyName: this.ompfinexMarketDtoMap.get(key)!.base_currency.name,
            kucoin: kucoinWSCustomData,
            omp: null,
            binance: null
          })
          this.intersectionMarketSubject.next(this.intersectionMarketMap);
        }
      })
    })
  ).subscribe();
}
