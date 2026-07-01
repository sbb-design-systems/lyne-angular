import { Component } from '@angular/core';
import { SbbChipLabelModule } from '@sbb-esta/lyne-angular/chip-label';
import { SbbFlipCardModule } from '@sbb-esta/lyne-angular/flip-card';
import { SbbImageModule } from '@sbb-esta/lyne-angular/image';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title flip-card with chip
 * @order 2
 */
@Component({
  selector: 'sbb-flip-card-chip-example',
  templateUrl: 'flip-card-chip-example.html',
  imports: [SbbChipLabelModule, SbbFlipCardModule, SbbImageModule, SbbLinkModule, SbbTitleModule],
})
export class FlipCardChipExample {}
