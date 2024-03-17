import {Injectable} from '@angular/core';
import {map, timer} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClockFacade {
  public get clock$() {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      calendar: 'persian',
      numberingSystem: 'arab'
    };
    const persianDate = new Intl.DateTimeFormat('fa-IR', options);
    return timer(0, 1).pipe(map(() => {
      const now = new Date();
      return persianDate.format(now);
    }));
  }
}
