import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, DecimalPipe, NgOptimizedImage, NgTemplateOutlet} from "@angular/common";
import {DashboardFacade} from '@market/data-access/dashboard.facade';
import {numberAnimation} from "@market/util/number.animation";

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
  readonly intersectionMarketsMap$ = this.dashboardFacade.intersectionMarket$;

  ngOnInit() {
    this.dashboardFacade.initWebSocket();
  }
}
