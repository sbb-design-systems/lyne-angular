import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CdnIcon {
  name: string;
  namespace: string | null;
  tags: (string | null)[];
}

export interface CdnIconsResponse {
  version: string;
  icons: CdnIcon[];
}

interface CdnPictogramsResponse {
  version: string;
  picto: CdnIcon[];
}

export interface CdnIcons {
  iconVersion: string;
  pictoVersion: string;
  icons: CdnIcon[];
}

@Service()
export class CdnIconService {
  #http: HttpClient = inject(HttpClient);

  loadIcons(): Observable<CdnIconsResponse> {
    return this.#http.get<CdnIconsResponse>('https://icons.app.sbb.ch/icons/index.json');
  }

  loadPictos(): Observable<CdnIconsResponse> {
    return this.#http.get<CdnPictogramsResponse>('https://icons.app.sbb.ch/picto/index.json').pipe(
      map((res) => ({
        icons: res.picto.map((icon) => ({ ...icon, namespace: 'picto' })),
        version: res.version,
      })),
    );
  }
}
