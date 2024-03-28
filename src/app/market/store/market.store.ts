import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {OmpfinexMarket, OmpfinexMarketWebsocket} from '@market/entity/ompfinex.entity';
import {MarketData} from '@market/entity/kucoin.entity';
import {environment} from "@environment";
import {BinanceStreamData} from "@market/entity/binance.entity";

@Injectable({
  providedIn: 'root'
})
export class MarketStore {
  ompfinexMarkets$ = new Observable<OmpfinexMarket[]>();
  ompfinexMarketsWebSocket$ = new Observable<OmpfinexMarketWebsocket[]>();
  readonly kucoinIconPath = environment.kucoinIconPath;
  readonly kucoinCurrencyMap = new Map<string, MarketData>();
  readonly kucoinWebsocketMarketSubject = new Subject<Map<string, MarketData>>();
  readonly intersectionMarketMap = new Map<string, any>();
  readonly intersectionMarketSubject = new Subject<Map<string, any>>();
  readonly binanceMarketDtoMap = new Map<string, BinanceStreamData>()
  readonly binanceMarketDtoMapSubject = new Subject<Map<string, BinanceStreamData>>()
}
