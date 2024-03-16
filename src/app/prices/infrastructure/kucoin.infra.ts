import { Injectable } from '@angular/core';
import { InfraAbstract } from '@shared/abstract/infra.abstract';
import {KucoinCurrencyListData, KucoinPublicBulletResponse} from '@prices/data-access/entity/kucoin.entity';
import { Observable } from 'rxjs';
import { CustomWebsocket } from '@shared/abstract/custom-websocket';

@Injectable({
  providedIn: 'root'
})
export class KucoinInfra extends InfraAbstract {
  protected readonly kucoinSpotBaseUrl: string = "https://api.kucoin.com";
  public readonly kucoinIconPath: string = "https://assets.staticimg.com/cms/media/3gfl2DgVUqjJ8FnkC7QxhvPmXmPgpt42FrAqklVMr.png";
  private readonly customWebsocket = new CustomWebsocket();
  public getKucoinPublicTokenWebsocket(): Observable<KucoinPublicBulletResponse> {
    return this.httpClient.post<KucoinPublicBulletResponse>(`${this.kucoinSpotBaseUrl}/api/${this.versionsEnum.V1}/bullet-public`, null);
  }
}
