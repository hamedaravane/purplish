import {Component, inject, OnInit} from '@angular/core';
import {OmpfinexMarketFacade} from "@prices/data-access/ompfinex-market.facade";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  private readonly ompfinexMarketFacade = inject(OmpfinexMarketFacade);
  public readonly ompfinexCurrenciesMap = this.ompfinexMarketFacade.ompfinexCurrenciesMapGetter;

  ngOnInit() {
    this.ompfinexMarketFacade.getOmpfinexCurrencies();
  }
}
