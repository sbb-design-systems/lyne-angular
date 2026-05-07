import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SbbAutocompleteModule } from '@sbb-esta/lyne-angular/autocomplete';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';

/**
 * @title sbb-autocomplete with template-driven form and displayWith
 */
@Component({
  selector: 'sbb-autocomplete-template-example',
  templateUrl: 'autocomplete-template-example.html',
  styleUrl: 'autocomplete-template-example.scss',
  imports: [SbbAutocompleteModule, SbbCardModule, SbbFormFieldModule, JsonPipe, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteTemplateExample {
  protected readonly options: { id: number; value: { prop: string; anotherProp: number } }[] = [
    { id: 0, value: { prop: 'First value', anotherProp: 1 } },
    { id: 1, value: { prop: 'Second value', anotherProp: 2 } },
    { id: 2, value: { prop: 'Third value', anotherProp: 3 } },
  ];
  protected value = this.options[0];
  protected displayWith:
    | ((v: { id: number; value: { prop: string; anotherProp: number } }) => string)
    | null = (v) => (v ? v.value.prop : v);
}
