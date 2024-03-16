import {Injectable} from "@angular/core";
import {InfraAbstract} from "@shared/abstract/infra.abstract";
import {OmpfinexCurrency, OmpfinexDataResponse} from "@prices/data-access/entity/ompfinex.entity";

@Injectable({
  providedIn: "root"
})
export class OmpfinexInfra extends InfraAbstract {
  ompfinexApiBaseUrl = 'https://api.ompfinex.com'
  getOmpfinexCurrencies() {
    return this.httpClient.get<OmpfinexDataResponse<OmpfinexCurrency[]>>(`${this.ompfinexApiBaseUrl}/v2/currencies`);
  }
}
