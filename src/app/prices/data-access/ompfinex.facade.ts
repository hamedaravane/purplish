import {inject, Injectable} from "@angular/core";
import {OmpfinexInfra} from "@prices/infrastructure/ompfinex.infra";
import {OmpfinexCurrency, OmpfinexDataResponse} from "@prices/data-access/entity/ompfinex.entity";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class OmpfinexFacade {
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
  }
}
