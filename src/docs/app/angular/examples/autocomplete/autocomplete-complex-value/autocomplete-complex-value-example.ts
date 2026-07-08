import type { KeyValue } from '@angular/common';
import { JsonPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbAutocompleteModule } from '@sbb-esta/lyne-angular/autocomplete';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';

/**
 * @title sbb-autocomplete with complex values
 * @order 4
 */
@Component({
  selector: 'sbb-autocomplete-complex-value-example',
  templateUrl: 'autocomplete-complex-value-example.html',
  imports: [FormField, SbbAutocompleteModule, SbbCardModule, SbbFormFieldModule, JsonPipe],
})
export class AutocompleteComplexValueExample {
  private readonly options: KeyValue<string, number>[] = [
    { key: 'First value', value: 1 },
    { key: 'Second value', value: 2 },
    { key: 'Third value', value: 3 },
  ];
  protected control = form(signal<KeyValue<string, number> | string | null>(null));
  protected displayWith: (v: KeyValue<string, number>) => string = (
    v: KeyValue<string, number>,
  ): string => (v ? v.key : v);
  protected filteredOptions = computed(() => {
    const value = this.control().value();
    const name = typeof value === 'string' ? value : value?.key;
    return name ? this.filter(name) : this.options.slice(0);
  });

  private filter(key: string): KeyValue<string, number>[] {
    const filterValue = key.toLowerCase();
    return this.options.filter((opt) => opt.key.toLowerCase().toLowerCase().includes(filterValue));
  }
}
