import { NgModule } from '@angular/core';
import type { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import { PACKAGES } from '../shared/meta';
import { PackageViewerComponent } from '../shared/package-viewer/package-viewer.component';

const routes: Routes = [
  {
    path: '',
    component: PackageViewerComponent,
    data: { packageData: PACKAGES['angular'] },
    children: [
      // {
      //   path: '',
      //   redirectTo: 'introduction/getting-started',
      //   pathMatch: 'full',
      // },
      // {
      //   path: 'icon-overview',
      //   component: IconOverviewComponent,
      // },
      // {
      //   path: 'introduction/:id',
      //   component: MarkdownViewerComponent,
      //   data: { packageName: 'angular' },
      // },
      // {
      //   path: 'guides/:id',
      //   component: MarkdownViewerComponent,
      //   data: { packageName: 'angular' },
      // },
      // {
      //   path: 'components/:id',
      //   component: ComponentViewerComponent,
      //   data: { packageName: 'angular' },
      //   children: componentViewerSubnavigation,
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AngularRoutingModule {}
