import {Injectable} from '@angular/core';
import {InfraAbstract} from '@shared/abstract/infra.abstract';
import {Observable} from "rxjs";
import {KucoinPublicBulletResponse} from "@market/entity/kucoin.entity";
import {environment} from "@environment";

@Injectable({
  providedIn: 'root'
})
export class KucoinInfra extends InfraAbstract {
  getKucoinPublicBulletResponse(): Observable<KucoinPublicBulletResponse> {
    return this.httpClient.get<KucoinPublicBulletResponse>(`${environment.baseUrl}/kucoin/token`);
  }
}
