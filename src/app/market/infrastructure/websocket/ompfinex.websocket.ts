import {inject, Injectable} from "@angular/core";
import {MarketStore} from "@market/store/market.store";
import {environment} from "@environment";
import {CentrifugeAbstract} from "@shared/abstract/centrifuge.abstract";
import {Centrifuge} from "centrifuge";

@Injectable({
  providedIn: "root"
})
export class OmpfinexWebsocket extends CentrifugeAbstract {
  private readonly marketStore = inject(MarketStore);
  protected client = new Centrifuge(environment.ompfinexStreamBaseUrl);

  init() {
    this.connect();
    this.subscribe('public-market:r-price-ag');
  }
}
