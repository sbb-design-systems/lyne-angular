import type { Routes } from '@angular/router';

import { VariantSwitch } from './variant-switch';

export const routes: Routes = [
  {
    path: '',
    canActivate: [VariantSwitch],
    children: [
      {
        path: '',
        redirectTo: 'angular',
        pathMatch: 'full',
      },
      {
        path: 'angular',
        loadChildren: () => import('./angular/angular.module').then((m) => m.AngularModule),
      },
      {
        path: 'angular-experimental',
        loadChildren: () =>
          import('./angular-experimental/angular-experimental.module').then(
            (m) => m.AngularExperimentalModule,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
