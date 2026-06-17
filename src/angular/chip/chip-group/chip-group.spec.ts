import type { ElementRef, Signal } from '@angular/core';
import { Component, signal, viewChild } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import { SbbAutocomplete } from '@sbb-esta/lyne-angular/autocomplete';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field';
import { SbbOption } from '@sbb-esta/lyne-angular/option';
import type {
  SbbChipInputTokenEndEvent,
  SbbChipElement,
} from '@sbb-esta/lyne-elements/chip.pure.js';

import { SbbChipGroup } from './chip-group';

describe('sbb-chip-group', () => {
  describe('signal forms', () => {
    describe('with string value', () => {
      let fixture: ComponentFixture<SignalTestComponent>, component: SignalTestComponent;

      beforeEach(async () => {
        fixture = TestBed.createComponent(SignalTestComponent);
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

        expect(component.control().value()).toEqual(['chip 1', 'Option A']);
      });

      it('should be touched on blur', async () => {
        expect(component.control().touched()).toBe(false);

        (fixture.nativeElement as HTMLElement)
          .querySelector('sbb-chip-group')!
          .dispatchEvent(new FocusEvent('focusout'));

        expect(component.control().touched()).toBe(true);
      });
    });

    describe('with complex value', () => {
      let fixture: ComponentFixture<SignalTestComponentWithComplexValue>,
        component: SignalTestComponentWithComplexValue,
        input: HTMLInputElement;

      beforeEach(async () => {
        fixture = TestBed.createComponent(SignalTestComponentWithComplexValue);
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

        expect(component.favoriteFruits().value().length).toBe(1);
        expect(component.chipGroup().value!.length).toBe(1);
        expect(component.favoriteFruits().value()).contains(component.availableFruits[0]);
      });

      it('should create from user input', async () => {
        // Simulate user typing in the input
        input.value = 'Lemon';
        input.dispatchEvent(new InputEvent('input'));
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        fixture.detectChanges();
        await fixture.whenStable();
        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(component.favoriteFruits().value().length).toBe(1);
        expect(component.chipGroup().value!.length).toBe(1);
        expect(component.favoriteFruits().value()).contains(component.availableFruits[0]);
      });

      it('should handle deletion', async () => {
        component.favoriteFruits().value.set(component.availableFruits);
        await fixture.whenStable();
        expect(component.favoriteFruits().value().length).toBe(3);
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

        expect(component.favoriteFruits().value().length).toBe(2);
        expect(component.chipGroup().value!.length).toBe(2);
      });
    });
  });

  describe('reactive forms', () => {
    describe('with string value', () => {
      let fixture: ComponentFixture<ReactiveTestComponent>, component: ReactiveTestComponent;

      beforeEach(async () => {
        fixture = TestBed.createComponent(ReactiveTestComponent);
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
        expect(component.control.touched).toBe(false);

        (fixture.nativeElement as HTMLElement)
          .querySelector('sbb-chip-group')!
          .dispatchEvent(new FocusEvent('focusout'));

        expect(component.control.touched).toBe(true);
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
        expect(component.favoriteFruits.value).contains(component.availableFruits[0]);
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
        expect(component.favoriteFruits.value).contains(component.availableFruits[0]);
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
});

@Component({
  template: `<sbb-form-field>
    <label for="input">Label</label>
    <sbb-chip-group [formField]="control">
      <input id="input" placeholder="Placeholder" />
    </sbb-chip-group>
    <sbb-autocomplete>
      <sbb-option value="Option A">Option A</sbb-option>
      <sbb-option value="Option B">Option B</sbb-option>
    </sbb-autocomplete>
  </sbb-form-field>`,
  imports: [SbbChipGroup, SbbFormField, FormField, SbbAutocomplete, SbbOption],
})
class SignalTestComponent {
  control = form(signal(['chip 1']));
}

@Component({
  template: `<sbb-form-field>
    <label for="input">Favorite fruits</label>
    <sbb-chip-group
      [formField]="favoriteFruits"
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
  </sbb-form-field>`,
  imports: [SbbChipGroup, SbbFormField, FormField, SbbAutocomplete, SbbOption],
})
export class SignalTestComponentWithComplexValue {
  readonly availableFruits: Fruit[] = [
    { name: 'Lemon', color: 'yellow' },
    { name: 'Lime', color: 'green' },
    { name: 'Apple', color: 'red' },
  ];

  chipGroup: Signal<SbbChipGroup<Fruit>> = viewChild.required(SbbChipGroup);
  input: Signal<ElementRef<HTMLInputElement>> = viewChild.required('input');

  favoriteFruits = form(signal<Fruit[]>([]));
  get remainingFruits() {
    return this.availableFruits.filter((fruit) => !this.favoriteFruits().value()!.includes(fruit));
  }

  add(chipTokenEndEvent: SbbChipInputTokenEndEvent<Fruit | string>): void {
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
      this.favoriteFruits().value.set([...this.favoriteFruits().value(), foundFruit]);
      // Clear input
      this.input().nativeElement.value = '';
    }
  }

  formatFruit = (value: Fruit): string => {
    return `${value.name} (${value.color})`;
  };
}

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
  imports: [SbbChipGroup, SbbFormField, ReactiveFormsModule, SbbAutocomplete, SbbOption],
})
class ReactiveTestComponent {
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
  imports: [SbbChipGroup, SbbFormField, ReactiveFormsModule, SbbAutocomplete, SbbOption],
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

  add(chipTokenEndEvent: SbbChipInputTokenEndEvent<Fruit | string>): void {
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
