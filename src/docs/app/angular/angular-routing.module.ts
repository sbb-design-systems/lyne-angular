import { NgModule } from '@angular/core';
import type { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import { HowToUpdateComponent } from '../how-to-update/how-to-update';
import { componentViewerSubnavigation } from '../shared/component-viewer/component-viewer/component-viewer-subnavigation';
import { ComponentViewerComponent } from '../shared/component-viewer/component-viewer/component-viewer.component';
import type { LoaderBuilder } from '../shared/loader-builder';
import { MarkdownViewerComponent } from '../shared/markdown-viewer/markdown-viewer.component';
import { PACKAGES } from '../shared/meta';
import { PackageViewerComponent } from '../shared/package-viewer/package-viewer.component';

import { IconOverviewComponent } from './icon-overview/icon-overview.component';

const routes: Routes = [
  {
    path: '',
    component: PackageViewerComponent,
    data: {
      packageName: 'angular',
      packageData: PACKAGES['angular'],
    },
    children: [
      {
        path: '',
        redirectTo: 'guides/getting-started',
        pathMatch: 'full',
      },
      {
        path: 'guides/icon-overview',
        component: IconOverviewComponent,
      },
      {
        path: 'guides/how-to-update',
        component: HowToUpdateComponent,
      },
      {
        path: 'guides/:id',
        component: MarkdownViewerComponent,
        data: {
          loaderBuilderInterceptor: (loaderBuilder: LoaderBuilder) => loaderBuilder.fromGuide(),
        },
      },
      {
        path: 'components/:id',
        component: ComponentViewerComponent,
        children: componentViewerSubnavigation,
      },
      {
        path: 'components/:module/:id',
        component: ComponentViewerComponent,
        children: componentViewerSubnavigation,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AngularRoutingModule {}
