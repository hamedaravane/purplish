import {inject, Injectable} from "@angular/core";
import {MarketStore} from "@market/store/market.store";
import {environment} from "@environment";
import {CentrifugeAbstract} from "@shared/abstract/centrifuge.abstract";

@Injectable({
  providedIn: "root"
})
export class OmpfinexWebsocket extends CentrifugeAbstract {
  private readonly marketStore = inject(MarketStore);
  protected endpoint: string = environment.ompfinexStreamBaseUrl;

  init() {
    this.connect();
    this.subscribe('public-market:r-price-ag');
  }
}
