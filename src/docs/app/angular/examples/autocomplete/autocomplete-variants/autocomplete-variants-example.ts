import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { SbbAutocompleteModule } from '@sbb-esta/lyne-angular/autocomplete';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';
import type { SbbAutocompleteElement } from '@sbb-esta/lyne-elements/autocomplete.js';

/**
 * @title sbb-autocomplete with configurable properties
 */
@Component({
  selector: 'sbb-autocomplete-variants-example',
  templateUrl: 'autocomplete-variants-example.html',
  styleUrl: 'autocomplete-variants-example.scss',
  imports: [
    SbbAutocompleteModule,
    SbbCardModule,
    SbbFormFieldModule,
    SbbCheckboxModule,
    SbbRadioButtonModule,
    SbbTitleModule,
    JsonPipe,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteVariantsExample {
  protected control = new FormControl<string | null>(null);
  protected form = inject(FormBuilder).nonNullable.group({
    borderless: false,
    floatingLabel: false,
    requireSelection: false,
    autoSelectActiveOption: false,
    autoActiveFirstOption: false,
    size: 'm' as SbbAutocompleteElement['size'],
  });

  protected readonly borderless = toSignal(this.form.controls.borderless.valueChanges, {
    initialValue: this.form.controls.borderless.value,
  });
  protected readonly floatingLabel = toSignal(this.form.controls.floatingLabel.valueChanges, {
    initialValue: this.form.controls.floatingLabel.value,
  });
  protected readonly requireSelection = toSignal(this.form.controls.requireSelection.valueChanges, {
    initialValue: this.form.controls.requireSelection.value,
  });
  protected readonly autoSelectActiveOption = toSignal(
    this.form.controls.autoSelectActiveOption.valueChanges,
    {
      initialValue: this.form.controls.autoSelectActiveOption.value,
    },
  );
  protected readonly autoActiveFirstOption = toSignal(
    this.form.controls.autoActiveFirstOption.valueChanges,
    {
      initialValue: this.form.controls.autoActiveFirstOption.value,
    },
  );
  protected readonly size = toSignal(this.form.controls.size.valueChanges, {
    initialValue: this.form.controls.size.value,
  });
}
