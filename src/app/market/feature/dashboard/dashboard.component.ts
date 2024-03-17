import {Component, inject, OnInit} from '@angular/core';
import {OmpfinexFacade} from "@prices/data-access/ompfinex.facade";
import { AsyncPipe, NgOptimizedImage, NgTemplateOutlet } from "@angular/common";
import { KucoinFacade } from '@prices/data-access/kucoin.facade';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgOptimizedImage,
    AsyncPipe,
    NgTemplateOutlet
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private readonly ompfinexMarketFacade = inject(OmpfinexFacade);
  private readonly kucoinFacade = inject(KucoinFacade);
  readonly kucoinIconPath = this.kucoinFacade.kucoinIconPath;
  readonly ompfinexCurrenciesMap = this.ompfinexMarketFacade.ompfinexCurrenciesMapGetter;
  readonly kucoinMessage$ = this.kucoinFacade.kucoinMarketData$;
}
