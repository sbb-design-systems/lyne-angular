import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import type { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbDateInputModule } from '@sbb-esta/lyne-angular/date-input';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';
import type { SbbDateInputElement } from '@sbb-esta/lyne-elements/date-input.pure.js';

function dateConstraintsValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const dateValue: AbstractControl<Date | null> = group.get('dateValue')!;
    const disabled: boolean = group.get('disabled')!.value;

    if (disabled && dateValue.enabled) {
      dateValue.disable({ emitEvent: false });
    } else if (!disabled && dateValue.disabled) {
      dateValue.enable({ emitEvent: false });
    }

    const errors: ValidationErrors = {};
    const value: Date | null = dateValue.value;
    const min: Date | null = group.get('min')!.value ?? null;
    const max: Date | null = group.get('max')!.value ?? null;
    const filterFn: ((d: Date) => boolean) | null = group.get('dateFilter')!.value;

    if (value && min && value < min) {
      errors['min'] = { min, actual: value };
    }
    if (value && max && value > max) {
      errors['max'] = { max, actual: value };
    }
    if (value && filterFn && !filterFn(value)) {
      errors['dateFilter'] = { actual: value };
    }

    dateValue.setErrors(Object.keys(errors).length ? errors : null, { emitEvent: false });
    return null;
  };
}

/**
 * @title date-input with configurable properties
 * @order 4
 */
@Component({
  selector: 'sbb-date-input-variants-example',
  templateUrl: 'date-input-variants-example.html',
  imports: [
    ReactiveFormsModule,
    DatePipe,
    SbbCheckboxModule,
    SbbDateInputModule,
    SbbFormFieldModule,
    SbbRadioButtonModule,
    SbbTitleModule,
  ],
})
export class DateInputVariantsExample {
  protected noFilter: SbbDateInputElement['dateFilter'] = () => true;
  protected filterOdd: SbbDateInputElement['dateFilter'] = (d: Date) => d.getFullYear() % 2 === 0;
  protected filterEven: SbbDateInputElement['dateFilter'] = (d: Date) => d.getFullYear() % 2 === 1;

  /**
   * TODO: replace with signal forms and move min/max/disabled/dateFilter to validators
   *  when PR https://github.com/angular/angular/pull/69452 is merged.
   */
  protected form = new FormBuilder().group(
    {
      dateValue: new FormControl<Date | null>(new Date('2024-12-12')),
      min: new FormControl<Date | null>(new Date('2024-01-01')),
      max: new FormControl<Date | null>(new Date('2027-01-01')),
      disabled: new FormControl<boolean>(false, { nonNullable: true }),
      dateFilter: new FormControl<(d: Date) => boolean>(() => true, { nonNullable: true }),
    },
    { validators: dateConstraintsValidator() },
  );
}
