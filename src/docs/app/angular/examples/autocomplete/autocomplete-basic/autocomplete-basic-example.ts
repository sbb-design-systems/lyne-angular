import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbAutocompleteModule } from '@sbb-esta/lyne-angular/autocomplete';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';

/**
 * @title Basic autocomplete
 */
@Component({
  selector: 'sbb-autocomplete-basic-example',
  templateUrl: 'autocomplete-basic-example.html',
  imports: [SbbAutocompleteModule, SbbFormFieldModule, FormField, JsonPipe],
})
export class AutocompleteBasicExample {
  values: { property: string; otherProp: string }[] = [
    { property: 'value 1', otherProp: 'test' },
    { property: 'value 2', otherProp: 'other test' },
  ];
  control = form(signal(this.values[0]));
  displayWith: ((value: { property: string; otherProperty: string }) => string) | null = (value) =>
    value ? value.property : value;
}
