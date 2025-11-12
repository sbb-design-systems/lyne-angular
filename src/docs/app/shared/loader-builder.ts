import type { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import type { ModuleParams } from './module-params';

export class LoaderBuilder {
  private _url?: string;
  private readonly _packageName: string;
  private readonly _module: string | undefined;
  private readonly _id: string;

  constructor(
    private _http: HttpClient,
    params: ModuleParams,
  ) {
    this._packageName = params.packageName;
    this._module = params.module;
    this._id = params.id;
  }

  fromDocumentation() {
    this._url = `docs-content/overviews/${this._packageName}/${this._id}.md`;
    return this;
  }

  fromModuleDocumentation() {
    const modulePath = this._module ? `${this._module}/` : '';
    this._url = `docs-content/overviews/${this._packageName}/${modulePath}${this._id}/readme.md`;
    return this;
  }

  fromApiDocumentation() {
    this._url = `docs-content/overviews/${this._packageName}/${this._id}/api.md`;
    return this;
  }

  fromExamples(name: string, file: string) {
    const modulePath = this._module ? `${this._module}/` : '';
    this._url = `docs-content/examples/${this._packageName}/${modulePath}${this._id}/${name}/${file}`;
    return this;
  }

  load(): Observable<string> {
    console.log(this._url);
    return this._http.get(this._url!, { responseType: 'text' }).pipe(catchError(() => of('')));
  }
}
