import { Component, inject, OnInit } from '@angular/core';
import { PricesInfra } from '../../infrastructure/prices.infra';
import { PricesService } from '../../data-access/prices.service';

@Component({
  selector: 'app-kucoin',
  standalone: true,
  imports: [],
  templateUrl: './kucoin.component.html',
  styleUrl: './kucoin.component.scss'
})
export class KucoinComponent implements OnInit {
  private readonly pricesService = inject(PricesService);

  ngOnInit() {
    this.pricesService.createKucoinWebsocketConnection();
  }
}
