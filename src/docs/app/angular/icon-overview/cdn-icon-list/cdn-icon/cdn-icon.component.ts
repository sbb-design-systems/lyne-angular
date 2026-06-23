import { Component, computed, inject, input } from '@angular/core';
import type { SbbDialog } from '@sbb-esta/lyne-angular/dialog';
import { SbbDialogService } from '@sbb-esta/lyne-angular/dialog';
import { SbbIconModule } from '@sbb-esta/lyne-angular/icon';
import { SbbTooltipModule } from '@sbb-esta/lyne-angular/tooltip';

import type { CdnIcon } from '../../cdn-icon.service';
import { CdnIconDialogComponent } from '../cdn-icon-dialog/cdn-icon-dialog.component';

@Component({
  selector: 'sbb-cdn-icon',
  imports: [SbbIconModule, SbbTooltipModule],
  templateUrl: './cdn-icon.component.html',
  styleUrl: './cdn-icon.component.scss',
})
export class CdnIconComponent {
  cdnIcon = input.required<CdnIcon>();
  protected cdnIconPath = computed(() => {
    return this.cdnIcon().namespace
      ? `${this.cdnIcon().namespace}:${this.cdnIcon().name}`
      : this.cdnIcon().name;
  });
  protected readonly dialogService = inject(SbbDialogService);

  protected openDialog(): void {
    this.dialogService.open(CdnIconDialogComponent, {
      setupContainer: (dialog: SbbDialog) => (dialog.backdrop = 'translucent'),
      data: { cdnIconPath: this.cdnIconPath(), tags: (this.cdnIcon().tags || []).join(', ') },
    });
  }
}
