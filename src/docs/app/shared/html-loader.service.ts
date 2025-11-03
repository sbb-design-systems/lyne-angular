import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { LoaderBuilder } from './loader-builder';
import type { ModuleParams } from './module-params';

@Injectable({
  providedIn: 'root',
})
export class HtmlLoader {
  private _http = inject(HttpClient);

  withParams(moduleParams: ModuleParams): LoaderBuilder {
    return new LoaderBuilder(this._http, moduleParams);
  }
}
