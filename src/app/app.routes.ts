import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo: 'main'
  },
  {
    path: 'main',
    loadChildren: () => import('./layout/layout.routes').then(r => r.routes)
  }
];
