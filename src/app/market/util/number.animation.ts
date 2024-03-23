import {animate, style, transition, trigger} from "@angular/animations";

export const numberAnimation = trigger('numberAnimate', [
  transition(':increment', [
    style({ opacity: 0.2 }),
    animate('200ms ease-out', style({ opacity: 1 })),
  ]),
  transition(':decrement', [
    style({ opacity: 0.2 }),
    animate('200ms ease-in', style({ opacity: 1 })),
  ]),
])
