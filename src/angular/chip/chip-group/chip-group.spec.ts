import type { ElementRef, Signal } from '@angular/core';
import { Component, viewChild } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SbbAutocomplete } from '@sbb-esta/lyne-angular/autocomplete';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field';
import { SbbOption } from '@sbb-esta/lyne-angular/option';
import type { SbbChipInputTokenEndEventDetails } from '@sbb-esta/lyne-elements/chip/chip-group.js';
import type { SbbChipElement } from '@sbb-esta/lyne-elements/chip/chip.js';

import { SbbChipGroup } from './chip-group';

describe('sbb-chip-group', () => {
  describe('with string value', () => {
    let fixture: ComponentFixture<TestComponent>, component: TestComponent;

    beforeEach(async () => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', async () => {
      expect(component).toBeDefined();

      const nativeElement = fixture.nativeElement as HTMLElement;
      const input = nativeElement.querySelector('input')!;

      // Simulate user typing in the input
      input.value = 'Option';
      input.dispatchEvent(new InputEvent('input'));
      fixture.detectChanges();
      await fixture.whenStable();
      await new Promise((resolve) => setTimeout(resolve, 0));

      // Select an option from the autocomplete
      nativeElement.querySelector('sbb-option')!.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.control.value).toEqual(['chip 1', 'Option A']);
    });

    it('should be touched on blur', async () => {
      expect(component.control.touched).toBeFalse();

      (fixture.nativeElement as HTMLElement)
        .querySelector('sbb-chip-group')!
        .dispatchEvent(new FocusEvent('focusout'));

      expect(component.control.touched).toBeTrue();
    });
  });

  describe('with complex value', () => {
    let fixture: ComponentFixture<TestComponentWithComplexValue>,
      component: TestComponentWithComplexValue,
      input: HTMLInputElement;

    beforeEach(async () => {
      fixture = TestBed.createComponent(TestComponentWithComplexValue);
      component = fixture.componentInstance;
      fixture.detectChanges();
      await new Promise((resolve) => setTimeout(resolve, 0));

      input = fixture.nativeElement.querySelector('input')!;

      expect(component).toBeDefined();
    });

    it('should select from autocomplete', async () => {
      const nativeElement = fixture.nativeElement as HTMLElement;

      // Simulate user typing in the input
      input.value = 'Lemon';
      input.dispatchEvent(new InputEvent('input'));
      fixture.detectChanges();
      await fixture.whenStable();
      await new Promise((resolve) => setTimeout(resolve, 0));

      // Select an option from the autocomplete
      nativeElement.querySelector('sbb-option')!.click();
      fixture.detectChanges();
      await fixture.whenStable();
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(component.favoriteFruits.value.length).toBe(1);
      expect(component.chipGroup().value!.length).toBe(1);
      expect(component.favoriteFruits.value).toEqual([{ name: 'Lemon', color: 'yellow' }]);
    });

    it('should create from user input', async () => {
      // Simulate user typing in the input
      input.value = 'Lemon';
      input.dispatchEvent(new InputEvent('input'));
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      fixture.detectChanges();
      await fixture.whenStable();
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(component.favoriteFruits.value.length).toBe(1);
      expect(component.chipGroup().value!.length).toBe(1);
      expect(component.favoriteFruits.value).toEqual([{ name: 'Lemon', color: 'yellow' }]);
    });

    it('should handle deletion', async () => {
      component.favoriteFruits.setValue(component.availableFruits);
      expect(component.favoriteFruits.value.length).toBe(3);
      expect(component.chipGroup().value!.length).toBe(3);
      fixture.detectChanges();
      await fixture.whenStable();

      const chipToDelete = (fixture.nativeElement as HTMLElement).querySelector<
        SbbChipElement<Fruit>
      >('sbb-chip')!;
      chipToDelete.focus();
      chipToDelete.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true, composed: true }),
      );
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.favoriteFruits.value.length).toBe(2);
      expect(component.chipGroup().value!.length).toBe(2);
    });
  });
});

@Component({
  template: `<sbb-form-field>
    <label for="input">Label</label>
    <sbb-chip-group [formControl]="control">
      <input id="input" placeholder="Placeholder" />
    </sbb-chip-group>
    <sbb-autocomplete>
      <sbb-option value="Option A">Option A</sbb-option>
      <sbb-option value="Option B">Option B</sbb-option>
    </sbb-autocomplete>
  </sbb-form-field>`,
  imports: [SbbChipGroup, SbbFormField, ReactiveFormsModule],
})
class TestComponent {
  control = new FormControl(['chip 1']);
}

interface Fruit {
  name: string;
  color: string;
}

@Component({
  template: `<sbb-form-field>
    <label for="input">Favorite fruits</label>
    <sbb-chip-group
      [formControl]="favoriteFruits"
      (chipInputTokenEnd)="add($event)"
      [displayWith]="formatFruit"
    >
      <input id="input" #input />
    </sbb-chip-group>
    <sbb-autocomplete>
      @for (fruit of remainingFruits; track fruit) {
        <sbb-option [value]="fruit">{{ formatFruit(fruit) }}</sbb-option>
      }
    </sbb-autocomplete>
  </sbb-form-field> `,
  imports: [
    SbbChipGroup<Fruit>,
    SbbFormField,
    ReactiveFormsModule,
    SbbAutocomplete<Fruit>,
    SbbOption<Fruit>,
  ],
})
export class TestComponentWithComplexValue {
  readonly availableFruits: Fruit[] = [
    { name: 'Lemon', color: 'yellow' },
    { name: 'Lime', color: 'green' },
    { name: 'Apple', color: 'red' },
  ];

  chipGroup: Signal<SbbChipGroup<Fruit>> = viewChild.required(SbbChipGroup);
  input: Signal<ElementRef<HTMLInputElement>> = viewChild.required('input');

  favoriteFruits = new FormControl<Fruit[]>([], { nonNullable: true });
  get remainingFruits() {
    return this.availableFruits.filter((fruit) => !this.favoriteFruits.value!.includes(fruit));
  }

  add(chipTokenEndEvent: CustomEvent<SbbChipInputTokenEndEventDetails<Fruit>>): void {
    if (
      chipTokenEndEvent.detail.origin === 'autocomplete' ||
      typeof chipTokenEndEvent.detail.value !== 'string'
    ) {
      return;
    }
    chipTokenEndEvent.preventDefault();

    const value = (chipTokenEndEvent.detail.value ?? '').trim();

    if (!value) {
      return;
    }
    const foundFruit = this.availableFruits.find(
      (fruit) => fruit.name.toUpperCase() === value.toUpperCase(),
    );

    if (foundFruit) {
      this.#addValueToControl(foundFruit);
      // Clear input
      this.input().nativeElement.value = '';
    }
  }

  #addValueToControl(foundFruit: Fruit) {
    this.favoriteFruits.patchValue([...this.favoriteFruits.value!, foundFruit]);
    this.favoriteFruits.markAsDirty();
  }

  formatFruit = (value: Fruit): string => {
    return `${value.name} (${value.color})`;
  };
}
