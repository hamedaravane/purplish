import {Injectable} from "@angular/core";
import {InfraAbstract} from "@shared/abstract/infra.abstract";
import {OmpfinexCurrency, OmpfinexDataResponse, OmpfinexMarketDto} from "@market/entity/ompfinex.entity";
import {map} from "rxjs";
import {environment} from "@environment";

@Injectable({
  providedIn: "root"
})
export class OmpfinexInfra extends InfraAbstract {
  ompfinexApiBaseUrl = environment.ompfinexApiBaseUrl;
  ompfinexWebsocketApiBaseUrl = environment.ompfinexStreamBaseUrl;

  getOmpfinexCurrencies() {
    return this.httpClient.get<OmpfinexDataResponse<OmpfinexCurrency[]>>(`${this.ompfinexApiBaseUrl}/${this.versionsEnum.V2}/currencies`)
      .pipe(map((res) => res.data));
  }

  getOmpfinexMarkets() {
    return this.httpClient.get<OmpfinexDataResponse<OmpfinexMarketDto[]>>(`${this.ompfinexApiBaseUrl}/${this.versionsEnum.V1}/market`)
      .pipe(map((res) => res.data));
  }
}
