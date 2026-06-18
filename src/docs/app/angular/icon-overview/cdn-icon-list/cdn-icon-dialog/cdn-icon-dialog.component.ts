import { Component, computed, inject } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SBB_OVERLAY_DATA } from '@sbb-esta/lyne-angular/core';
import { SbbDialogModule } from '@sbb-esta/lyne-angular/dialog';
import { SbbIconModule } from '@sbb-esta/lyne-angular/icon';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

import type { CdnIcon } from '../../cdn-icon.service';

@Component({
  selector: 'sbb-cdn-icon-dialog',
  templateUrl: './cdn-icon-dialog.component.html',
  styleUrls: ['./cdn-icon-dialog.component.scss'],
  imports: [SbbDialogModule, SbbButtonModule, SbbIconModule, SbbTitleModule],
})
export class CdnIconDialogComponent {
  data = inject<{ cdnIcon: CdnIcon }>(SBB_OVERLAY_DATA);

  cdnIcon = computed(() => {
    return this.data.cdnIcon;
  });

  tags = computed(() => {
    return this.cdnIcon().tags.join(', ');
  });

  cdnIconPath = computed(() => {
    return this.cdnIcon().namespace
      ? `${this.cdnIcon().namespace}:${this.cdnIcon().name}`
      : this.cdnIcon().name;
  });
}
