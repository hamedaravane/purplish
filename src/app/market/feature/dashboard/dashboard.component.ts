import {Component, inject} from '@angular/core';
import { AsyncPipe, NgOptimizedImage, NgTemplateOutlet } from "@angular/common";
import {OmpfinexFacade} from '@market/data-access/ompfinex.facade';
import {KucoinFacade} from '@market/data-access/kucoin.facade';

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
