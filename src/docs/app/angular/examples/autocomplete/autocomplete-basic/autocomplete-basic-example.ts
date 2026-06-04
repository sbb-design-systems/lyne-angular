import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SbbAutocompleteModule } from '@sbb-esta/lyne-angular/autocomplete';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';

/**
 * @title Basic autocomplete
 */
@Component({
  selector: 'sbb-autocomplete-basic-example',
  templateUrl: 'autocomplete-basic-example.html',
  imports: [SbbAutocompleteModule, SbbFormFieldModule, ReactiveFormsModule],
})
export class AutocompleteBasicExample {
  values: { property: string; otherProp: string }[] = [
    { property: 'value 1', otherProp: 'test' },
    { property: 'value 2', otherProp: 'other test' },
  ];
  control = new FormControl(this.values[0]);
  displayWith: ((value: { property: string; otherProperty: string }) => string) | null = (value) =>
    value ? value.property : value;
}
