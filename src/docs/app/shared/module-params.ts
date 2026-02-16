import type { ActivatedRoute } from '@angular/router';
import type { Observable } from 'rxjs';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import type { LoaderBuilder } from './loader-builder';
import type { ShowcaseMetaPackage } from './meta';

export interface ModuleParams {
  packageData: ShowcaseMetaPackage;
  packageName: string;
  module?: string;
  id: string;
  loaderBuilderInterceptor?: (loaderBuilder: LoaderBuilder) => LoaderBuilder;
}

/**
 * Combines current route's params/data with its ancestor's params/data.
 * The usage of the `Array.unshift` before `Object.assign` allows to override ancestors params/data.
 */
export const moduleParams = (route: ActivatedRoute): Observable<ModuleParams> => {
  const streams: Observable<ModuleParams>[] = [];
  let currentRoute: ActivatedRoute | null = route;

  while (currentRoute) {
    streams.unshift(
      combineLatest([currentRoute.params, currentRoute.data]).pipe(
        map(([params, data]) => ({ ...params, ...data }) as ModuleParams),
      ),
    );
    currentRoute = currentRoute.parent;
  }

  return combineLatest(streams).pipe(map((parts) => Object.assign({}, ...parts) as ModuleParams));
};
