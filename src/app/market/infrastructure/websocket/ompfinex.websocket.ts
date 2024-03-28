import {Injectable} from "@angular/core";
import {environment} from "@environment";
import {WebsocketAbstract} from "@shared/abstract/websocket.abstract";

@Injectable({
  providedIn: "root"
})
export class OmpfinexWebsocket extends WebsocketAbstract {
  protected endpoint: string = environment.ompfinexStreamBaseUrl;

  init() {
    this.connect();
  }

  protected handleMessages(message: any): void {
    console.log(message);
  }

  protected onComplete(): void {
    console.log('ompfinex websocket closed');
  }

  protected onError(err: Error): void {
    console.log('in ompfinex websocket error happened', err);
  }
}
