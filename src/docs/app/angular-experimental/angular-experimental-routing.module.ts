import { NgModule } from '@angular/core';
import type { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import { PACKAGES } from '../shared/meta';
import { PackageViewerComponent } from '../shared/package-viewer/package-viewer.component';

const routes: Routes = [
  {
    path: '',
    component: PackageViewerComponent,
    data: { packageData: PACKAGES['angular-experimental'] },
    children: [
      // {
      //   path: '',
      //   redirectTo: 'introduction/getting-started',
      //   pathMatch: 'full',
      // },
      // {
      //   path: 'introduction/:id',
      //   component: MarkdownViewerComponent,
      //   data: { packageName: 'angular-experimental' },
      // },
      // {
      //   path: 'components/:id',
      //   component: ComponentViewerComponent,
      //   data: { packageName: 'angular-experimental' },
      //   children: componentViewerSubnavigation,
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AngularExperimentalRoutingModule {}
