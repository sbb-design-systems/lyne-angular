import { JsonPipe } from '@angular/common';
import {
  Component,
  computed,
  type ElementRef,
  signal,
  type Signal,
  viewChild,
} from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbAutocompleteModule } from '@sbb-esta/lyne-angular/autocomplete';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbChipModule } from '@sbb-esta/lyne-angular/chip';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import type { SbbChipInputTokenEndEvent } from '@sbb-esta/lyne-elements/chip.pure.js';

interface Fruit {
  name: string;
  color: string;
}

/**
 * @title sbb-chip with complex value
 * @order 10
 */
@Component({
  selector: 'sbb-chip-complex-value-example',
  templateUrl: 'chip-complex-value-example.html',
  imports: [
    FormField,
    JsonPipe,
    SbbChipModule,
    SbbFormFieldModule,
    SbbAutocompleteModule,
    SbbCardModule,
  ],
})
export class ChipComplexValueExample {
  protected readonly availableFruits: Fruit[] = [
    { name: 'Lemon', color: 'yellow' },
    { name: 'Lime', color: 'green' },
    { name: 'Apple', color: 'red' },
  ];

  protected input: Signal<ElementRef<HTMLInputElement>> = viewChild.required('input');
  protected favoriteFruits = form(signal<Fruit[]>([]));
  protected remainingFruits = computed(() => {
    return this.availableFruits.filter((fruit) => !this.favoriteFruits().value()!.includes(fruit));
  });

  protected add(chipTokenEndEvent: SbbChipInputTokenEndEvent<Fruit | string>): void {
    if (
      chipTokenEndEvent.origin === 'autocomplete' ||
      typeof chipTokenEndEvent.value !== 'string'
    ) {
      return;
    }
    chipTokenEndEvent.preventDefault();

    const value = (chipTokenEndEvent.value ?? '').trim();
    if (!value) {
      return;
    }

    const foundFruit = this.availableFruits.find(
      (fruit) => fruit.name.toUpperCase() === value.toUpperCase(),
    );
    if (foundFruit) {
      this.#addValueToControl(foundFruit);
      this.input().nativeElement.value = '';
    }
  }

  protected formatFruit = (value: Fruit): string => {
    return `${value.name} (${value.color})`;
  };

  #addValueToControl(foundFruit: Fruit) {
    this.favoriteFruits().value.set([...this.favoriteFruits().value()!, foundFruit]);
    this.favoriteFruits().markAsDirty();
  }
}
