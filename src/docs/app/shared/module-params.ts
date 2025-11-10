import type { ActivatedRoute } from '@angular/router';
import type { Observable } from 'rxjs';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import type { LoaderBuilder } from './loader-builder';
import type { ShowcaseMetaPackage } from './meta';

export interface ModuleParams {
  packageData: ShowcaseMetaPackage;
  packageName: string;
  id: string;
  loaderBuilderInterceptor?: (loaderBuilder: LoaderBuilder) => LoaderBuilder;
}

export const moduleParams = (route: ActivatedRoute): Observable<ModuleParams> => {
  return combineLatest([route.parent!.params, route.params, route.parent!.data, route.data]).pipe(
    map(
      ([parentParams, params, parentData, data]) =>
        ({ ...parentParams, ...params, ...parentData, ...data }) as ModuleParams,
    ),
  );
};
