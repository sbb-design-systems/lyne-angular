import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbDateInputModule } from '@sbb-esta/lyne-angular/date-input';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';
import type { SbbDateInputElement } from '@sbb-esta/lyne-elements/date-input.pure.js';

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
  protected noFilter: SbbDateInputElement['dateFilter'] = () => true;
  protected filterOdd: SbbDateInputElement['dateFilter'] = (d: Date) => d.getFullYear() % 2 === 0;
  protected filterEven: SbbDateInputElement['dateFilter'] = (d: Date) => d.getFullYear() % 2 === 1;

  protected form = new FormBuilder().group({
    dateValue: new FormControl(new Date('2024-12-12')),
    min: new FormControl(new Date('2024-01-01')),
    max: new FormControl(new Date('2027-01-01')),
    disabled: new FormControl(false),
    dateFilter: new FormControl<(d: Date) => boolean>(() => true),
  });
}
