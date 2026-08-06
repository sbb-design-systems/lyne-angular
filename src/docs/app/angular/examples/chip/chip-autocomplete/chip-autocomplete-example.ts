import { Component, computed, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbAutocompleteModule } from '@sbb-esta/lyne-angular/autocomplete';
import { SbbChipModule } from '@sbb-esta/lyne-angular/chip';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';

/**
 * @title  sbb-chip with autocomplete
 * @order 2
 */
@Component({
  selector: 'sbb-chip-autocomplete-example',
  templateUrl: 'chip-autocomplete-example.html',
  imports: [FormField, SbbChipModule, SbbFormFieldModule, SbbAutocompleteModule],
})
export class ChipAutocompleteExample {
  protected options = ['Option A', 'Option B', 'Option C'] as const;
  protected availableOptions = computed(() => {
    const currentSelected = this.form.model().value();
    return this.options.filter((o) => !currentSelected.includes(o));
  });
  protected form = form(signal({ model: ['Option A'] }));
}
