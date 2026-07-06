import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import type { SbbChipLabel } from '@sbb-esta/lyne-angular/chip-label';
import { SbbChipLabelModule } from '@sbb-esta/lyne-angular/chip-label';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Basic chip-label
 */
@Component({
  selector: 'sbb-chip-label-showcase-example',
  templateUrl: 'chip-label-showcase-example.html',
  imports: [FormField, SbbChipLabelModule, SbbRadioButtonModule, SbbTitleModule],
})
export class ChipLabelShowcaseExample {
  protected controls = form(
    signal({
      color: 'milk' as SbbChipLabel['color'],
      size: 'xxs' as SbbChipLabel['size'],
    }),
  );
}
