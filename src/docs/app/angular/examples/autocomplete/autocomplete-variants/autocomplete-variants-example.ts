import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbActionGroup } from '@sbb-esta/lyne-angular/action-group';
import { SbbAutocompleteModule } from '@sbb-esta/lyne-angular/autocomplete';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';
import type { SbbAutocompleteElement } from '@sbb-esta/lyne-elements/autocomplete.pure.js';

/**
 * @title sbb-autocomplete with configurable properties
 */
@Component({
  selector: 'sbb-autocomplete-variants-example',
  templateUrl: 'autocomplete-variants-example.html',
  imports: [
    FormField,
    JsonPipe,
    SbbActionGroup,
    SbbAutocompleteModule,
    SbbCardModule,
    SbbCheckboxModule,
    SbbFormFieldModule,
    SbbRadioButtonModule,
    SbbTitleModule,
  ],
})
export class AutocompleteVariantsExample {
  protected control = form(signal<string | null>(null));

  protected form = form(
    signal({
      requireSelection: false,
      autoSelectActiveOption: false,
      autoActiveFirstOption: false,
      size: null as SbbAutocompleteElement['size'],
    }),
  );
}
