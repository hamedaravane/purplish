import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {OmpfinexMarket, OmpfinexMarketWebsocket} from '@market/entity/ompfinex.entity';
import {MarketData} from '@market/entity/kucoin.entity';
import {environment} from "@environment";
import {BinanceStreamData} from "@market/entity/binance.entity";
import {IntersectedMarket} from "@market/entity/market.entity";

@Injectable({
  providedIn: 'root'
})
export class MarketStore {
  readonly ompfinexMarketsWebSocketSubject = new Subject<OmpfinexMarketWebsocket[]>();
  readonly kucoinCurrencyMap = new Map<string, MarketData>();
  readonly kucoinWebsocketMarketSubject = new Subject<Map<string, MarketData>>();
  readonly binanceMarketDtoMap = new Map<string, BinanceStreamData>()
  readonly binanceMarketDtoMapSubject = new Subject<Map<string, BinanceStreamData>>()
  intersectedMarkets$ = new Observable<IntersectedMarket[]>();
}
