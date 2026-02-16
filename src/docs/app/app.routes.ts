import type { Routes } from '@angular/router';

import { IntroductionComponent } from './introduction/introduction.component';
import { VariantSwitch } from './variant-switch';

export const routes: Routes = [
  {
    path: '',
    canActivate: [VariantSwitch],
    children: [
      {
        path: '',
        redirectTo: 'introduction',
        pathMatch: 'full',
      },
      {
        path: 'introduction',
        component: IntroductionComponent,
      },
      // TODO: create if needed
      // {
      //   path: 'how-to-update',
      //   component: HowToUpdateComponent,
      // },
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
    redirectTo: 'introduction',
    pathMatch: 'full',
  },
];
