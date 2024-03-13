import { Injectable } from '@angular/core';
import { InfraAbstract } from '@shared/abstract/infra.abstract';
import { KucoinPublicBulletResponse } from '@prices/data-access/prices.entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PricesInfra extends InfraAbstract {
  public getKucoinPublicTokenWebsocket(): Observable<KucoinPublicBulletResponse> {
    return this.httpClient.post<KucoinPublicBulletResponse>(`${this.kucoinSpotBaseUrl}/api/${this.versionsEnum.V1}/bullet-public`, null);
  }
}
