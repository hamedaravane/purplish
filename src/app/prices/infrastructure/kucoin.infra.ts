import { Injectable } from '@angular/core';
import { InfraAbstract } from '@shared/abstract/infra.abstract';
import {KucoinCurrencyListData, KucoinPublicBulletResponse} from '@prices/data-access/entity/kucoin.entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KucoinInfra extends InfraAbstract {
  protected readonly kucoinSpotBaseUrl: string = "https://api.kucoin.com";
  public getKucoinPublicTokenWebsocket(): Observable<KucoinPublicBulletResponse> {
    return this.httpClient.post<KucoinPublicBulletResponse>(`${this.kucoinSpotBaseUrl}/api/${this.versionsEnum.V1}/bullet-public`, null);
  }

  /** @deprecated */
  public getKucoinCurrencyList() {
    return this.httpClient.get<KucoinCurrencyListData>(`${this.kucoinSpotBaseUrl}/api/${this.versionsEnum.V3}/currencies`);
  }
}
