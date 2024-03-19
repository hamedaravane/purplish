import {Injectable} from '@angular/core';
import {InfraAbstract} from '@shared/abstract/infra.abstract';
import {Observable} from "rxjs";
import {KucoinPublicBulletResponse} from "@market/entity/kucoin.entity";

@Injectable({
  providedIn: 'root'
})
export class KucoinInfra extends InfraAbstract {
  readonly kucoinWebsocketSpotBaseUrl: string = "wss://ws-api-spot.kucoin.com/?token=";
  readonly kucoinIconPath: string = "https://assets.staticimg.com/cms/media/3gfl2DgVUqjJ8FnkC7QxhvPmXmPgpt42FrAqklVMr.png";
  private readonly kucoinSpotBaseUrl: string = "https://api.kucoin.com";

  getKucoinPublicBulletResponse(): Observable<KucoinPublicBulletResponse> {
    return this.httpClient.post<KucoinPublicBulletResponse>(`${this.kucoinSpotBaseUrl}/api/${this.versionsEnum.V1}/bullet-public`, null)
  }
}
