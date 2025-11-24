import type { Routes } from '@angular/router';

import { HowToUpdateComponent } from './howtoupdate/how-to-update.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { VariantSwitch } from './variant-switch';

export const routes: Routes = [
  {
    path: '',
    canActivate: [VariantSwitch],
    children: [
      {
        path: '',
        component: IntroductionComponent,
      },
      {
        path: 'how-to-update',
        component: HowToUpdateComponent,
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
