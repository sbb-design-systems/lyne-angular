import { Component, signal } from '@angular/core';
import { disabled, form, FormField } from '@angular/forms/signals';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import type { SbbFlipCardSummary } from '@sbb-esta/lyne-angular/flip-card';
import { SbbFlipCardModule } from '@sbb-esta/lyne-angular/flip-card';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbImageModule } from '@sbb-esta/lyne-angular/image';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title flip-card with configurable properties
 * @order 1
 */
@Component({
  selector: 'sbb-flip-card-showcase-example',
  templateUrl: 'flip-card-showcase-example.html',
  imports: [
    FormField,
    SbbCheckboxModule,
    SbbFlipCardModule,
    SbbFormFieldModule,
    SbbImageModule,
    SbbLinkModule,
    SbbRadioButtonModule,
    SbbTitleModule,
  ],
})
export class FlipCardShowcaseExample {
  protected controls = form(
    signal({
      imageAlignment: 'after' as SbbFlipCardSummary['imageAlignment'],
      hasImage: false,
    }),
    (schemaPath) => {
      disabled(schemaPath.imageAlignment, {
        when: ({ valueOf }) => !valueOf(schemaPath.hasImage),
      });
    },
  );
}
