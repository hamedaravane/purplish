import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KucoinStore {
  private readonly kucoinSpotWebsocketApi = new Subject<string>();
  get kucoinSpotWebsocketApi$(): Observable<string> {
    return this.kucoinSpotWebsocketApi.asObservable();
  }
  set kucoinSpotWebsocketApi$(value: string) {
    this.kucoinSpotWebsocketApi.next(value);
  }
}
