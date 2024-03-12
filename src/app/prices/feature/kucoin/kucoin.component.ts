import { Component, inject, OnInit } from '@angular/core';
import { WebSocketService } from '../../infrastructure/websocet.service';

@Component({
  selector: 'app-kucoin',
  standalone: true,
  imports: [],
  templateUrl: './kucoin.component.html',
  styleUrl: './kucoin.component.scss'
})
export class KucoinComponent implements OnInit {
  private readonly webSocketService: WebSocketService = inject(WebSocketService);

  ngOnInit() {

  }
}
