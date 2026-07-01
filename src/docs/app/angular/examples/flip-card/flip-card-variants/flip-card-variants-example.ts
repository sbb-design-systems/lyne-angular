import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbChipLabelModule } from '@sbb-esta/lyne-angular/chip-label';
import { SbbFlipCardModule } from '@sbb-esta/lyne-angular/flip-card';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbImageModule } from '@sbb-esta/lyne-angular/image';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';
import type { SbbFlipCardSummaryElement } from '@sbb-esta/lyne-elements/flip-card.pure.js';

/**
 * @title flip-card with configurable properties
 */
@Component({
  selector: 'sbb-flip-card-variants-example',
  templateUrl: 'flip-card-variants-example.html',
  imports: [
    FormField,
    SbbCheckboxModule,
    SbbFlipCardModule,
    SbbFormFieldModule,
    SbbImageModule,
    SbbChipLabelModule,
    SbbLinkModule,
    SbbRadioButtonModule,
    SbbTitleModule,
  ],
})
export class FlipCardVariantsExample {
  protected controls = form(
    signal({
      imageAlignment: 'after' as SbbFlipCardSummaryElement['imageAlignment'],
      hasImage: false,
      hasChip: false,
    }),
  );
  protected readonly form = form;
}
