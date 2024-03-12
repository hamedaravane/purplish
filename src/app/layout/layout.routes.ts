import {Routes} from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./layout.component').then(c => c.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('../prices/feature/kucoin/kucoin.component').then(c => c.KucoinComponent)
      }
    ]
  }
];
