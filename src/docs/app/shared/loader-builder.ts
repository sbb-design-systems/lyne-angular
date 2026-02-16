import type { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import type { ModuleParams } from './module-params';

export class LoaderBuilder {
  #url?: string;
  readonly #packageName: string;
  readonly #module: string | undefined;
  readonly #id: string;

  constructor(
    private _http: HttpClient,
    params: ModuleParams,
  ) {
    this.#packageName = params.packageName;
    this.#module = params.module;
    this.#id = params.id;
  }

  fromDocumentation() {
    this.#url = `docs-content/overviews/${this.#packageName}/${this.#id}.md`;
    return this;
  }

  fromModuleDocumentation() {
    const modulePath = this.#module ? `${this.#module}/` : '';
    this.#url = `docs-content/overviews/${this.#packageName}/${modulePath}${this.#id}/readme.md`;
    return this;
  }

  fromApiDocumentation() {
    this.#url = `docs-content/api/${this.#packageName}/${this.#id}-api.md`;
    return this;
  }

  fromExamples(name: string, file: string) {
    const modulePath = this.#module ? `${this.#module}/` : '';
    this.#url = `docs-content/examples/${this.#packageName}/${modulePath}${this.#id}/${name}/${file}`;
    return this;
  }

  load(): Observable<string> {
    return this._http.get(this.#url!, { responseType: 'text' }).pipe(catchError(() => of('')));
  }
}
