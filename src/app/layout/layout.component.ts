import {Component, inject} from '@angular/core';
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
export class LayoutComponent {
  private readonly clockFacade = inject(ClockFacade);
  clock$ = this.clockFacade.clock$;
}
