import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SbbLoadingIndicatorModule } from '@sbb-esta/lyne-angular/loading-indicator';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { CdnIconListComponent } from './cdn-icon-list/cdn-icon-list.component';
import { CdnIconService } from './cdn-icon.service';

@Component({
  selector: 'sbb-icon-overview',
  imports: [SbbLoadingIndicatorModule, CdnIconListComponent],
  templateUrl: './icon-overview.component.html',
})
export class IconOverviewComponent {
  #iconCdnService = inject(CdnIconService);

  cdnIcons = toSignal(
    forkJoin([
      this.#iconCdnService.loadDeprecated(),
      this.#iconCdnService.loadIcons(),
      this.#iconCdnService.loadPictos(),
    ]).pipe(
      map(([deprecated, icons, pictos]) => ({
        deprecatedVersion: deprecated.version,
        iconVersion: icons.version,
        pictoVersion: pictos.version,
        icons: icons.icons.concat(deprecated.icons, pictos.icons),
      })),
    ),
  );
}
