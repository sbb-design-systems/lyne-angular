import { Component, inject, input } from '@angular/core';
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
  dialogService = inject(SbbDialogService);
  cdnIcon = input.required<CdnIcon>();

  get cdnIconPath() {
    return this.cdnIcon().namespace
      ? `${this.cdnIcon().namespace}:${this.cdnIcon().name}`
      : this.cdnIcon().name;
  }

  openDialog() {
    this.dialogService.open(CdnIconDialogComponent, {
      data: { cdnIcon: this.cdnIcon() },
    });
  }
}
