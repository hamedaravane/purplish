import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { WebsocketAbstract } from '@shared/abstract/websocket.abstract';
import { PricesInfra } from '@prices/infrastructure/prices.infra';
import { KucoinInstanceServer } from '@prices/data-access/prices.entity';

@Injectable({
  providedIn: 'root'
})
export class PricesService extends WebsocketAbstract {
  private readonly pricesInfra = inject(PricesInfra);
  protected override onMessageReceived(msg: any): void {
    this.sendMessage(
      {
        id: msg.id,
        type: 'subscribe',
        topic: '/market/snapshot:USD',
        response: true
      }
    )
  }
  public createKucoinWebsocketConnection(): void {
    this._createKucoinWebsocketConnection().then();
  }
  private async _createKucoinWebsocketConnection() {
    this.pricesInfra.getKucoinPublicTokenWebsocket()
    const publicToken = await firstValueFrom(this.pricesInfra.getKucoinPublicTokenWebsocket());
    this.url = this.getInstanceServersEndpoint(publicToken.data.instanceServers) + '?token=' + publicToken.data.token;
    this.connect();
  }
  private getInstanceServersEndpoint(array: KucoinInstanceServer[]) {
    const firstIndex = array[0];
    return firstIndex.endpoint;
  }
}
