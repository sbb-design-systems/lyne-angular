import type { Routes } from '@angular/router';

import { VariantSwitch } from './variant-switch';

export const routes: Routes = [
  {
    path: '',
    canActivate: [VariantSwitch],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
