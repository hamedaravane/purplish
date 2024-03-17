import {Injectable} from "@angular/core";
import {InfraAbstract} from "@shared/abstract/infra.abstract";
import {OmpfinexCurrency, OmpfinexDataResponse} from "@prices/data-access/entity/ompfinex.entity";
import { CustomWebsocket } from '@shared/abstract/custom-websocket';

@Injectable({
  providedIn: "root"
})
export class OmpfinexInfra extends InfraAbstract {
  ompfinexApiBaseUrl = 'https://api.ompfinex.com';
  ompfinexWebsocketApiBaseUrl = 'wss://stream.ompfinex.com/stream';
  private readonly customWebsocket = new CustomWebsocket(this.ompfinexWebsocketApiBaseUrl);
  getOmpfinexCurrencies() {
    return this.httpClient.get<OmpfinexDataResponse<OmpfinexCurrency[]>>(`${this.ompfinexApiBaseUrl}/v2/currencies`);
  }
}
