import {Injectable} from "@angular/core";
import {webSocket, WebSocketSubject} from "rxjs/webSocket";
import {takeWhile, tap, timer} from "rxjs";

@Injectable({
  providedIn: "root"
})
export abstract class WebsocketAbstract {
  protected abstract endpoint: string;
  private webSocketSubject!: WebSocketSubject<any>;

  protected connect(): void {
    if (!this.webSocketSubject || this.webSocketSubject.closed) {
      this.webSocketSubject = webSocket(this.endpoint);
      this.onConnect();
    }
  }

  protected onConnect() {
    this.webSocketSubject.subscribe({
      next: message => this.handleMessages(message),
      error: err => this.onError(err),
      complete: () => this.onComplete()
    })
  }

  protected abstract handleMessages(message: any): void;

  protected abstract onError(err: Error): void;

  protected abstract onComplete(): void;

  protected disconnect() {
    this.webSocketSubject.complete();
  }

  protected sendMessage(message: any) {
    this.webSocketSubject.next(message);
  }

  protected keepAlive(pingInterval: number, pingMessage: any, pingTimeout?: number) {
    timer(pingTimeout ?? 0, pingInterval).pipe(
      takeWhile(() => !this.webSocketSubject.closed),
      tap(() => this.sendMessage(pingMessage))
    ).subscribe();
  }
}
