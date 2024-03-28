import {Injectable} from "@angular/core";
import {InfraAbstract} from "@shared/abstract/infra.abstract";
import {
  convertToOmpfinexMarketDomain,
  OmpfinexDataResponse,
  OmpfinexMarket,
  OmpfinexMarketDto
} from "@market/entity/ompfinex.entity";
import {map, Observable} from "rxjs";
import {environment} from "@environment";

@Injectable({
  providedIn: "root"
})
export class OmpfinexInfra extends InfraAbstract {
  getOmpfinexMarkets(): Observable<OmpfinexMarket[]> {
    return this.httpClient.get<OmpfinexDataResponse<OmpfinexMarketDto[]>>(`${environment.baseUrl}/omp/markets`)
      .pipe(map((res: OmpfinexDataResponse<OmpfinexMarketDto[]>) => {
        return convertToOmpfinexMarketDomain(res.data);
      }));
  }
}
