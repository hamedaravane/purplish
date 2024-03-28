import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, DecimalPipe, NgOptimizedImage, NgTemplateOutlet} from "@angular/common";
import {DashboardFacade} from '@market/data-access/dashboard.facade';
import numberAnimation from "@market/util/number.animation";
import {MarketStore} from "@market/store/market.store";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgOptimizedImage,
    AsyncPipe,
    NgTemplateOutlet,
    DecimalPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  animations: [numberAnimation]
})
export class DashboardComponent implements OnInit {
  private readonly dashboardFacade = inject(DashboardFacade);
  private readonly marketStore = inject(MarketStore);
  intersectedMarkets$ = this.marketStore.intersectedMarkets$;

  ngOnInit() {
    this.dashboardFacade.getOmpfinexMarkets();
    this.dashboardFacade.initWebSocket();
    this.dashboardFacade.combineMarkets();
  }
}
