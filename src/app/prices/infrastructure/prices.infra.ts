import { inject, Injectable } from '@angular/core';
import { WebSocketService } from '../infrastructure/websocet.service';
import { InfraAbstract } from '../../shared/abstract/infra.abstract';
import { combineLatest, firstValueFrom, map, merge, Observable } from 'rxjs';
import { KucoinPublicBulletResponse } from '../data-access/prices.entity';
import { KucoinStore } from '../data-access/kucoin.store';

@Injectable({
  providedIn: 'root'
})
export class PricesInfra extends InfraAbstract {
  kucoinStore = inject(KucoinStore);
  webSocketService = inject(WebSocketService);
  getCryptoPricesFromKucoin() {
    firstValueFrom(this.getKucoinPublicTokenWebsocket()).then((publicToken) => {
      this.kucoinStore.kucoinSpotWebsocketApi$ = publicToken.data.instanceServers[0].endpoint;
      return this.webSocketService.connect(publicToken.data.instanceServers[0].endpoint + '?token=' + publicToken.data.token)
    })
  }

  getKucoinPublicTokenWebsocket(): Observable<KucoinPublicBulletResponse> {
    return this.httpClient.post<KucoinPublicBulletResponse>(this.kucoinSpotBaseUrl, {});
  }
}
