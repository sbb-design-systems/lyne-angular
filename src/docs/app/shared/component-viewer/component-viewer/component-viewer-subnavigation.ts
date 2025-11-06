import type { Routes } from '@angular/router';

import type { LoaderBuilder } from '../../loader-builder';
import { MarkdownViewerComponent } from '../../markdown-viewer/markdown-viewer.component';
import { ExampleListViewerComponent } from '../example-list-viewer/example-list-viewer.component';

export const componentViewerSubnavigation: Routes = [
  {
    path: 'overview',
    component: MarkdownViewerComponent,
    data: {
      loaderBuilderInterceptor: (loaderBuilder: LoaderBuilder) =>
        loaderBuilder.fromModuleDocumentation(),
    },
  },
  {
    path: 'api',
    component: MarkdownViewerComponent,
    data: {
      loaderBuilderInterceptor: (loaderBuilder: LoaderBuilder) =>
        loaderBuilder.fromApiDocumentation(),
    },
  },
  {
    path: 'examples',
    component: ExampleListViewerComponent,
  },
  {
    path: '**',
    redirectTo: 'overview',
  },
];
