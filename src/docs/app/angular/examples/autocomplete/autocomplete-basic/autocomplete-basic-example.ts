import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbAutocompleteModule } from '@sbb-esta/lyne-angular/autocomplete';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';

/**
 * @title Basic autocomplete
 */
@Component({
  selector: 'sbb-autocomplete-basic-example',
  templateUrl: 'autocomplete-basic-example.html',
  imports: [FormField, SbbAutocompleteModule, SbbCardModule, SbbFormFieldModule, JsonPipe],
})
export class AutocompleteBasicExample {
  protected readonly options: string[] = ['Value 1', 'Value 2', 'Value 3'];
  protected control = form(signal(this.options[0]));
}
