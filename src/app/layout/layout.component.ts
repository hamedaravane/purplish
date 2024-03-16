import { Component, inject, OnInit } from '@angular/core';
import {
  NzContentComponent,
  NzFooterComponent,
  NzHeaderComponent,
  NzLayoutComponent,
  NzSiderComponent
} from "ng-zorro-antd/layout";
import {RouterOutlet} from "@angular/router";
import {ClockFacade} from '../shared/feature/clock/clock.facade';
import {AsyncPipe} from '@angular/common';
import { OmpfinexFacade } from '@prices/data-access/ompfinex.facade';
import { KucoinFacade } from '@prices/data-access/kucoin.facade';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    NzLayoutComponent,
    NzSiderComponent,
    NzHeaderComponent,
    NzContentComponent,
    NzFooterComponent,
    RouterOutlet,
    AsyncPipe
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  private readonly ompfinexMarketFacade = inject(OmpfinexFacade);
  private readonly kucoinFacade = inject(KucoinFacade);

  ngOnInit() {
    this.ompfinexMarketFacade.getOmpfinexCurrencies();
    this.kucoinFacade.createKucoinWebsocketConnection();
  }
}
