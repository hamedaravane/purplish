import { Injectable } from '@angular/core';
import { InfraAbstract } from '@shared/abstract/infra.abstract';
import {KucoinCurrencyListData, KucoinPublicBulletResponse} from '@prices/data-access/entity/kucoin.entity';
import { map, Observable } from 'rxjs';
import { CustomWebsocket } from '@shared/abstract/custom-websocket';

@Injectable({
  providedIn: 'root'
})
export class KucoinInfra extends InfraAbstract {
  protected readonly kucoinSpotBaseUrl: string = "https://api.kucoin.com";
  protected readonly kucoinWebsocketSpotBaseUrl: string = "wss://ws-api-spot.kucoin.com/?token=";
  public readonly kucoinIconPath: string = "https://assets.staticimg.com/cms/media/3gfl2DgVUqjJ8FnkC7QxhvPmXmPgpt42FrAqklVMr.png";
  private customWebsocket!: CustomWebsocket;
  public getKucoinPublicTokenWebsocket(): Observable<KucoinPublicBulletResponse> {
    return this.httpClient.post<KucoinPublicBulletResponse>(`${this.kucoinSpotBaseUrl}/api/${this.versionsEnum.V1}/bullet-public`, null)
      .pipe(
        map((response) => {
          this.customWebsocket = new CustomWebsocket(this.kucoinWebsocketSpotBaseUrl + response.data.token);
          return response;
        })
      );
  }
}
