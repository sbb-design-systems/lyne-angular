import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { LoaderBuilder } from './loader-builder';
import type { ModuleParams } from './module-params';

@Injectable({
  providedIn: 'root',
})
export class HtmlLoader {
  #http: HttpClient = inject(HttpClient);

  withParams(moduleParams: ModuleParams): LoaderBuilder {
    return new LoaderBuilder(this.#http, moduleParams);
  }
}
