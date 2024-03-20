import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, NgOptimizedImage, NgTemplateOutlet} from "@angular/common";
import {DashboardFacade} from '@market/data-access/dashboard.facade';

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
  private readonly dashboardFacade = inject(DashboardFacade);

  ngOnInit() {
    this.dashboardFacade.initWebSocket();
  }
}
