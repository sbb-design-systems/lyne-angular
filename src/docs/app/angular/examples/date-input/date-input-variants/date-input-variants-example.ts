import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbDateInputModule } from '@sbb-esta/lyne-angular/date-input';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';
import type { SbbRadioButtonElement } from '@sbb-esta/lyne-elements/radio-button.pure.js';

/**
 * @title date-input with configurable properties
 * @order 4
 */
@Component({
  selector: 'sbb-date-input-variants-example',
  templateUrl: 'date-input-variants-example.html',
  imports: [
    SbbCheckboxModule,
    SbbFormFieldModule,
    SbbRadioButtonModule,
    SbbTitleModule,
    SbbDateInputModule,
    SbbFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class DateInputVariantsExample {
  protected form = new FormBuilder().group({
    dateValue: new FormControl(new Date('2024-12-12')),
    min: new FormControl(new Date('2024-01-01')),
    max: new FormControl(new Date('2027-01-01')),
    disabled: new FormControl(false),
    dateFilter: new FormControl<(d: Date) => boolean>(() => true),
  });

  test(event: Event): void {
    const radio = event.target as SbbRadioButtonElement;
    if (!radio.checked) {
      return this.form.controls.dateFilter.patchValue(() => true);
    }
    this.form.controls.dateFilter.patchValue(
      (d: Date) => d.getFullYear() % 2 === (radio.value === 'odd' ? 0 : 1),
    );
  }
}
