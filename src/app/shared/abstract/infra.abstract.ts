import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Versions } from '../entity/shared.entity';

@Injectable({
  providedIn: 'root'
})
export class InfraAbstract {
  public readonly versionsEnum = Versions;
  protected readonly httpClient = inject(HttpClient);
  protected readonly kucoinSpotBaseUrl: string = "https://api.kucoin.com/";
  protected readonly kucoinFuturesBaseUrl: string = "https://api-futures.kucoin.com/";
}
