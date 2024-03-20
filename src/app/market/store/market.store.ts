import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {OmpfinexCurrency, OmpfinexMarketDto} from '@market/entity/ompfinex.entity';
import {MarketData} from '@market/entity/kucoin.entity';

@Injectable({
  providedIn: 'root'
})
export class MarketStore {
  readonly kucoinIconPath: string = "https://assets.staticimg.com/cms/media/3gfl2DgVUqjJ8FnkC7QxhvPmXmPgpt42FrAqklVMr.png";
  readonly ompfinexCurrencies = new Subject<OmpfinexCurrency[]>();
  readonly ompfinexMarkets = new Subject<OmpfinexMarketDto[]>();
  readonly ompfinexCurrencyMap = new Map<string, any>();
  readonly kucoinCurrencyMap = new Map<string, MarketData>();
  readonly kucoinWebsocketMarketSubject = new Subject<Map<string, MarketData>>();
  readonly intersectionMarketMap = new Map<string, any>();
  readonly intersectionMarketSubject = new Subject<Map<string, any>>();
}
