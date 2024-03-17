import {inject, Injectable} from "@angular/core";
import {OmpfinexInfra} from "@prices/infrastructure/ompfinex.infra";
import { OmpfinexCurrency, OmpfinexDataResponse, ompfinexWebsocketMessage } from "@prices/data-access/entity/ompfinex.entity";
import {firstValueFrom} from "rxjs";
import { WebsocketAbstract } from '@shared/abstract/websocket.abstract';

@Injectable({
  providedIn: "root"
})
export class OmpfinexFacade extends WebsocketAbstract {
  private readonly ompfinexInfra = inject(OmpfinexInfra);
  private ompfinexCurrenciesMap = new Map<string, OmpfinexCurrency>();

  public get ompfinexCurrenciesMapGetter() {
    return this.ompfinexCurrenciesMap;
  }

  public getOmpfinexCurrencies() {
    this._getOmpfinexCurrencies().then();
  }

  private async _getOmpfinexCurrencies() {
    const response = await firstValueFrom<OmpfinexDataResponse<OmpfinexCurrency[]>>(this.ompfinexInfra.getOmpfinexCurrencies());
    response.data.map(currency => {
      this.ompfinexCurrenciesMap.set(currency.id, currency);
    });
    this.connect(this.ompfinexInfra.ompfinexWebsocketApiBaseUrl);
    this.sendMessage({
      connect: {name: 'js'},
      id: 1
    })
  }
  protected override onMessageReceived(msg: ompfinexWebsocketMessage): void {
    switch (msg) {
      case msg.connect:
        this.sendMessage({
          id: 2,
          subscribe: {
            channel: 'public-market:r-price-ag'
          }
        })
        break;
      case msg.push:
        msg.push?.pub.data.data.map((value) => {
          console.log(value.price, value.m)
        })
        break;
    }
  }
}
