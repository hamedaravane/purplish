import {Injectable} from '@angular/core';
import {InfraAbstract} from '@shared/abstract/infra.abstract';
import {Observable} from "rxjs";
import {KucoinPublicBulletResponse} from "@market/entity/kucoin.entity";
import {environment} from "@environment";

@Injectable({
  providedIn: 'root'
})
export class KucoinInfra extends InfraAbstract {
  readonly kucoinWebsocketSpotBaseUrl = environment.kucoinStreamBaseUrl;
  private readonly kucoinSpotBaseUrl = environment.kucoinApiBaseUrl;

  getKucoinPublicBulletResponse(): Observable<KucoinPublicBulletResponse> {
    return this.httpClient.post<KucoinPublicBulletResponse>(`${this.kucoinSpotBaseUrl}/api/${this.versionsEnum.V1}/bullet-public`, null)
  }
}
