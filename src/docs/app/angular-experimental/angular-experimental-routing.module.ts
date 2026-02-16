import { NgModule } from '@angular/core';
import type { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import { componentViewerSubnavigation } from '../shared/component-viewer/component-viewer/component-viewer-subnavigation';
import { ComponentViewerComponent } from '../shared/component-viewer/component-viewer/component-viewer.component';
import type { LoaderBuilder } from '../shared/loader-builder';
import { MarkdownViewerComponent } from '../shared/markdown-viewer/markdown-viewer.component';
import { PACKAGES } from '../shared/meta';
import { PackageViewerComponent } from '../shared/package-viewer/package-viewer.component';

const routes: Routes = [
  {
    path: '',
    component: PackageViewerComponent,
    data: {
      packageName: 'angular-experimental',
      packageData: PACKAGES['angular-experimental'],
    },
    children: [
      {
        path: '',
        redirectTo: 'introduction/getting-started',
        pathMatch: 'full',
      },
      {
        path: 'introduction/:id',
        component: MarkdownViewerComponent,
        data: {
          loaderBuilderInterceptor: (loaderBuilder: LoaderBuilder) =>
            loaderBuilder.fromDocumentation(),
        },
      },
      {
        path: 'components/:id',
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
export class AngularExperimentalRoutingModule {}
