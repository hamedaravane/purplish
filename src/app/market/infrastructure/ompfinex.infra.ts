import {Injectable} from "@angular/core";
import {InfraAbstract} from "@shared/abstract/infra.abstract";
import {convertToOmpfinexMarketDomain, OmpfinexDataResponse, OmpfinexMarketDto} from "@market/entity/ompfinex.entity";
import {map} from "rxjs";
import {environment} from "@environment";

@Injectable({
  providedIn: "root"
})
export class OmpfinexInfra extends InfraAbstract {
  getOmpfinexMarkets() {
    return this.httpClient.get<OmpfinexDataResponse<OmpfinexMarketDto[]>>(`${environment.baseUrl}/omp/markets`)
      .pipe(map((res) => {
        return convertToOmpfinexMarketDomain(res.data);
      }));
  }
}
