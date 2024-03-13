import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class WebsocketAbstract {
  private socket$!: WebSocketSubject<any>;
  protected url!: string;
  protected connect(): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket(this.url);
      this.handleMessages();
      this.handleErrors();
    }
  }
  public disconnect(): void {
    if (this.socket$) {
      this.socket$.complete();
    }
  }
  public sendMessage(msg: any): void {
    if (this.socket$) {
      this.socket$.next(msg);
    }
  }
  protected onError(err: any): void {
    console.error('WebSocket error:', err);
  }
  protected abstract onMessageReceived(msg: any): void;
  protected handleMessages(): void {
    this.socket$.subscribe({
      next: (msg) => this.onMessageReceived(msg),
      error: (err) => this.onError(err),
      complete: () => console.log('WebSocket connection closed')
    });
  }
  private handleErrors(): void {
    this.socket$.subscribe({
      error: (error) => console.log('WebSocket connection error:', error)
    });
  }
  public asObservable(): Observable<any> {
    return this.socket$.asObservable();
  }
}
