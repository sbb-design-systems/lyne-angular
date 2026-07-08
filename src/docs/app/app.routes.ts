import type { Routes } from '@angular/router';

import { AppShellComponent } from './app-shell/app-shell.component';
import { FullscreenExampleViewerComponent } from './fullscreen-example-viewer/fullscreen-example-viewer.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { ThemeController } from './theme-controller';

export const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    canActivate: [ThemeController],
    children: [
      {
        path: '',
        component: IntroductionComponent,
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
    path: 'fullscreen-example/:package/:module/:id',
    component: FullscreenExampleViewerComponent,
    canActivate: [ThemeController],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
