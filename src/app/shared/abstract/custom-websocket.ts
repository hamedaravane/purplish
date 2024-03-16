import { Subject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

export class CustomWebsocket {
  private webSocketSubject = new Subject<any>();
  private onMessageReceived!: (msg: any) => void;

  constructor(private endpoint: string) {
    this.connect();
  }

  public get websocket$() {
    return this.webSocketSubject.asObservable();
  }
  private connect(): void {
    if (!this.webSocketSubject || this.webSocketSubject.closed) {
      this.webSocketSubject = webSocket(this.endpoint);
      this.handleMessages();
    }
  }
  private handleMessages(): void {
    this.webSocketSubject.subscribe({
      next: (msg) => this.onMessageReceived(msg),
      error: (err) => this.onError(err),
      complete: () => console.info('WebSocket connection closed')
    });
  }
  private sendMessage(msg: unknown): void {
    if (this.webSocketSubject) {
      this.webSocketSubject.next(msg);
    }
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
