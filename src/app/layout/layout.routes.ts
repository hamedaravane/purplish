import {Routes} from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout.component').then(c => c.LayoutComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'market'
      },
      {
        path: 'market',
        loadComponent: () => import('@market/feature/dashboard/dashboard.component').then(c => c.DashboardComponent)
      }
    ]
  }
];
