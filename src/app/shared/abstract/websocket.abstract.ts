import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export abstract class WebsocketAbstract {
  private webSocketSubject!: WebSocketSubject<any>;
  protected connect(endpoint: string): void {
    if (!this.webSocketSubject || this.webSocketSubject.closed) {
      this.webSocketSubject = webSocket(endpoint);
      this.handleMessages();
    }
  }
  public sendMessage(msg: unknown): void {
    if (this.webSocketSubject) {
      this.webSocketSubject.next(msg);
    }
  }
  protected abstract onMessageReceived(msg: unknown): void;
  protected handleMessages(): void {
    this.webSocketSubject.subscribe({
      next: (msg) => this.onMessageReceived(msg),
      error: (err) => this.onError(err),
      complete: () => console.info('WebSocket connection closed')
    });
  }
  public disconnect(): void {
    if (this.webSocketSubject) {
      this.webSocketSubject.complete();
    }
  }
  private onError(err: Error): void {
    console.error('WebSocket error:', err);
  }
}
