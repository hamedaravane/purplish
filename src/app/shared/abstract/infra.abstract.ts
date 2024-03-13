import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';
import { Versions } from '@shared/entity/shared.entity';

@Injectable({
  providedIn: 'root'
})
export class InfraAbstract {
  public readonly versionsEnum = Versions;
  protected readonly httpClient = inject(HttpClient);
  protected readonly kucoinSpotBaseUrl: string = "https://api.kucoin.com";
}
