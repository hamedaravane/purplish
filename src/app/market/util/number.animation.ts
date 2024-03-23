import {animate, style, transition, trigger} from "@angular/animations";

const numberAnimation = trigger('numberAnimate', [
  transition(':increment', [
    style({opacity: 0.5, color: 'rgb(34,197,94)'}),
    animate('200ms ease-out', style({ opacity: 1 })),
  ]),
  transition(':decrement', [
    style({opacity: 0.5, color: 'rgb(239,68,68)'}),
    animate('200ms ease-in', style({ opacity: 1 })),
  ]),
])
export default numberAnimation;
