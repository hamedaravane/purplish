import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, NgOptimizedImage, NgTemplateOutlet} from "@angular/common";
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
export class DashboardComponent implements OnInit {
  readonly kucoinMarketDataMap$ = this.kucoinFacade.kucoinMarketDataMap$;
  private readonly kucoinFacade = inject(KucoinFacade);
  readonly kucoinIconPath = this.kucoinFacade.kucoinIconPath;
  private readonly ompfinexFacade = inject(OmpfinexFacade);
  readonly ompfinexCurrencies = this.ompfinexFacade.ompfinexCurrencies;
  readonly ompfinexMarketWebsocket$ = this.ompfinexFacade.ompfinexMarketWebsocket$;

  ngOnInit() {
    this.ompfinexFacade.initWebSocket();
    this.kucoinFacade.initWebSocket();
  }
}
