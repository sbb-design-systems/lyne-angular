import { Component, computed, inject } from '@angular/core';
import { SbbLoadingIndicatorModule } from '@sbb-esta/lyne-angular/loading-indicator';

import { CdnIconListComponent } from './cdn-icon-list/cdn-icon-list.component';
import type { CdnIcons } from './cdn-icon.service';
import { CdnIconService } from './cdn-icon.service';

@Component({
  selector: 'sbb-icon-overview',
  imports: [SbbLoadingIndicatorModule, CdnIconListComponent],
  templateUrl: './icon-overview.component.html',
})
export class IconOverviewComponent {
  #iconCdnService = inject(CdnIconService);

  protected readonly cdnIcons = computed<CdnIcons | undefined>(() => {
    const iconsData = this.#iconCdnService.iconsResource.value();
    const pictosData = this.#iconCdnService.pictosResource.value();

    if (!iconsData || !pictosData) {
      return undefined;
    }

    return {
      iconVersion: iconsData.version,
      pictoVersion: pictosData.version,
      icons: iconsData.icons.concat(pictosData.icons),
    };
  });
}
