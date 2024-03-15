import {Routes} from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./layout.component').then(c => c.LayoutComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('../prices/feature/main/main.component').then(c => c.MainComponent)
      },
      {
        path: 'kucoin',
        loadComponent: () => import('../prices/feature/kucoin/kucoin.component').then(c => c.KucoinComponent)
      },
    ]
  }
];
