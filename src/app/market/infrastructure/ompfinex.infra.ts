import {Injectable} from "@angular/core";
import {InfraAbstract} from "@shared/abstract/infra.abstract";
import {OmpfinexCurrency, OmpfinexDataResponse, OmpfinexMarketDto} from "@market/entity/ompfinex.entity";
import {map} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class OmpfinexInfra extends InfraAbstract {
  ompfinexApiBaseUrl = 'https://api.ompfinex.com';
  ompfinexWebsocketApiBaseUrl = 'wss://stream.ompfinex.com/stream';

  getOmpfinexCurrencies() {
    return this.httpClient.get<OmpfinexDataResponse<OmpfinexCurrency[]>>(`${this.ompfinexApiBaseUrl}/${this.versionsEnum.V2}/currencies`)
      .pipe(map((res) => res.data));
  }

  getOmpfinexMarkets() {
    return this.httpClient.get<OmpfinexDataResponse<OmpfinexMarketDto[]>>(`${this.ompfinexApiBaseUrl}/${this.versionsEnum.V1}/market`)
      .pipe(map((res) => res.data));
  }
}
