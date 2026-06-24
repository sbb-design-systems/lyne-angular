import { Component, inject } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SBB_OVERLAY_DATA } from '@sbb-esta/lyne-angular/core';
import { SbbDialogModule } from '@sbb-esta/lyne-angular/dialog';
import { SbbIconModule } from '@sbb-esta/lyne-angular/icon';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

@Component({
  selector: 'sbb-cdn-icon-dialog',
  templateUrl: './cdn-icon-dialog.component.html',
  styleUrls: ['./cdn-icon-dialog.component.scss'],
  imports: [SbbDialogModule, SbbButtonModule, SbbIconModule, SbbTitleModule],
})
export class CdnIconDialogComponent {
  data = inject<{ tags: string[]; cdnIconPath: string }>(SBB_OVERLAY_DATA);
}
