import { Component, inject, OnInit } from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {KucoinFacade} from "@prices/data-access/kucoin.facade";

@Component({
  selector: 'app-kucoin',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './kucoin.component.html',
  styleUrl: './kucoin.component.scss'
})
export class KucoinComponent implements OnInit {
  private readonly kucoinFacade = inject(KucoinFacade);
  kucoinMessage$ = this.kucoinFacade.kucoinMarketData$;

  ngOnInit() {
    this.kucoinFacade.createKucoinWebsocketConnection();
  }
}
