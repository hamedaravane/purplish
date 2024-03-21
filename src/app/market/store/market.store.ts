import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {OmpfinexCurrency, OmpfinexMarketDto, ompfinexResponseWS} from '@market/entity/ompfinex.entity';
import {MarketData} from '@market/entity/kucoin.entity';

@Injectable({
  providedIn: 'root'
})
export class MarketStore {
  readonly kucoinIconPath: string = "https://assets.staticimg.com/cms/media/3gfl2DgVUqjJ8FnkC7QxhvPmXmPgpt42FrAqklVMr.png";
  readonly kucoinCurrencyMap = new Map<string, MarketData>();
  readonly kucoinWebsocketMarketSubject = new Subject<Map<string, MarketData>>();
  readonly ompfinexMarketsDtoSubject = new Subject<OmpfinexMarketDto[]>();
  readonly ompfinexMarketDtoMap = new Map<string, OmpfinexMarketDto>();
  readonly ompfinexMarketResponseWSSubject = new Subject<ompfinexResponseWS>();
  readonly intersectionMarketMap = new Map<string, any>();
  readonly intersectionMarketSubject = new Subject<Map<string, any>>();
}
