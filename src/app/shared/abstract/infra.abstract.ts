import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';
import { Versions } from '@shared/entity/shared.entity';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { CustomWebsocket } from '@shared/abstract/custom-websocket';

@Injectable({
  providedIn: 'root'
})
export class InfraAbstract {
  public readonly versionsEnum = Versions;
  protected readonly httpClient = inject(HttpClient);
}
