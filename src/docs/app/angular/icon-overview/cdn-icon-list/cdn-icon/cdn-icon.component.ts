import { Component, input } from '@angular/core';
import { SbbIconModule } from '@sbb-esta/lyne-angular/icon';
import { SbbTooltipModule } from '@sbb-esta/lyne-angular/tooltip';

import type { CdnIcon } from '../../cdn-icon.service';

@Component({
  selector: 'sbb-cdn-icon',
  imports: [SbbIconModule, SbbTooltipModule],
  templateUrl: './cdn-icon.component.html',
  styleUrl: './cdn-icon.component.scss',
})
export class CdnIconComponent {
  cdnIcon = input.required<CdnIcon>();
  iconFit = input.required<boolean>();

  get cdnIconPath() {
    return this.cdnIcon().namespace
      ? `${this.cdnIcon().namespace}:${this.cdnIcon().name}`
      : this.cdnIcon().name;
  }
}
