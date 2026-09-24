import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbAutocompleteModule } from '@sbb-esta/lyne-angular/autocomplete';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';

/**
 * @title Autocomplete with actions
 * @order 5
 */
@Component({
  selector: 'sbb-autocomplete-with-actions-example',
  templateUrl: 'autocomplete-with-actions-example.html',
  imports: [FormField, SbbAutocompleteModule, SbbCardModule, SbbFormFieldModule, JsonPipe],
})
export class AutocompleteWithActionsExample {
  protected readonly options: string[] = ['Value 1', 'Value 2', 'Value 3'];
  protected control = form(signal(this.options[0]));
}
