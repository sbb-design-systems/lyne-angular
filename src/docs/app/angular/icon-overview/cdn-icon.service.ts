import { httpResource } from '@angular/common/http';
import { Service } from '@angular/core';

export interface CdnIcon {
  name: string;
  namespace: string | null;
  tags: (string | null)[];
}

export interface CdnIconsResponse {
  version: string;
  icons: CdnIcon[];
}

export interface CdnIcons {
  iconVersion: string;
  pictoVersion: string;
  icons: CdnIcon[];
}

interface CdnPictogramsResponse {
  version: string;
  picto: CdnIcon[];
}

@Service()
export class CdnIconService {
  readonly iconsResource = httpResource<CdnIconsResponse>(
    () => 'https://icons.app.sbb.ch/icons/index.json',
  );

  readonly pictosResource = httpResource<CdnIconsResponse>(
    () => 'https://icons.app.sbb.ch/picto/index.json',
    {
      parse: (res: unknown): CdnIconsResponse => {
        const data = res as CdnPictogramsResponse;
        return {
          version: data.version,
          icons: data.picto.map((icon) => ({ ...icon, namespace: 'picto' })),
        };
      },
    },
  );
}
