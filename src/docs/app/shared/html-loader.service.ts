import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

import { LoaderBuilder } from './loader-builder';
import type { ModuleParams } from './module-params';

@Service()
export class HtmlLoader {
  #http: HttpClient = inject(HttpClient);

  withParams(moduleParams: ModuleParams): LoaderBuilder {
    return new LoaderBuilder(this.#http, moduleParams);
  }
}
