import {Injectable} from "@angular/core";
import {webSocket, WebSocketSubject} from "rxjs/webSocket";

@Injectable({
  providedIn: "root"
})
export class WebSocketService {
  private socket$!: WebSocketSubject<any>;

  public connect(url: string): WebSocketSubject<unknown> {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket({
        url,
        deserializer: e => JSON.parse(e.data)
      });
    }
    return this.socket$;
  }

  public disconnect(): void {
    if (this.socket$) {
      this.socket$.complete();
    }
  }
}
