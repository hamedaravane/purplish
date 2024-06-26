import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Versions} from '@shared/entity/shared.entity';

@Injectable({
  providedIn: 'root'
})
export class InfraAbstract {
  public readonly versionsEnum = Versions;
  protected readonly httpClient = inject(HttpClient);
}
