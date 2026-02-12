import { Component, viewChild, viewChildren } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field';
import { SbbOption } from '@sbb-esta/lyne-angular/option';

import { SbbAutocomplete } from './autocomplete';
import { SbbAutocompleteModule } from './autocomplete.module';

describe('sbb-autocomplete', () => {
  describe('with string value', () => {
    let fixture: ComponentFixture<TestComponent>, component: TestComponent;

    beforeEach(async () => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      // Wait for the fixture to stabilize
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    it('should create', async () => {
      expect(component).toBeDefined();
    });

    it('should open and close', async () => {
      const autocomplete = component.autocomplete();
      autocomplete.open();

      expect(autocomplete.isOpen).toBe(true);

      const option1 = (fixture.nativeElement as HTMLElement).querySelector('sbb-option')!;
      option1.click();

      expect(component.control.value).toEqual('option1');
      expect(autocomplete.isOpen).toBe(false);
    });
  });

  describe('with complex value', () => {
    let fixture: ComponentFixture<TestComponentWithComplexValue>,
      component: TestComponentWithComplexValue;

    beforeEach(async () => {
      fixture = TestBed.createComponent(TestComponentWithComplexValue);
      component = fixture.componentInstance;
      fixture.detectChanges();

      // Wait for the fixture to stabilize
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    it('select value', async () => {
      const optionSelected = vi.spyOn(component, 'optionSelected');
      const input = component.autocomplete().triggerElement!;

      expect(input.value).toEqual('value 1');
      expect(component.control.value).toEqual({ property: 'value 1', otherProp: 'test' });

      const options = (fixture.nativeElement as HTMLElement).querySelectorAll('sbb-option')!;
      options[1].click();
      fixture.detectChanges();

      expect(input.value).toEqual('value 2');
      expect(component.control.value).toEqual({ property: 'value 2', otherProp: 'other test' });
      expect(optionSelected).toHaveBeenCalledTimes(1);
    });

    it('should fill the text field correctly if value is set to obj programmatically', async () => {
      component.control.setValue({ property: 'new', otherProp: 'new' });
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.autocomplete().triggerElement!.value).toEqual('new');
      expect(component.control.value).toEqual({ property: 'new', otherProp: 'new' });
    });

    it('should clear the text field if value is reset programmatically', async () => {
      component.control.reset();

      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.autocomplete().triggerElement!.value).toEqual('');
    });

    it('should fill the text field with value if displayWith is not set', async () => {
      const autocomplete = component.autocomplete();
      autocomplete.open();
      expect(autocomplete.isOpen).toBe(true);

      component.displayWith = null;
      component.options()[1].value = 'test value';
      fixture.changeDetectorRef.markForCheck();
      fixture.detectChanges();

      const options = (fixture.nativeElement as HTMLElement).querySelectorAll('sbb-option')!;
      options[1].click();

      fixture.detectChanges();
      expect(
        component.autocomplete().triggerElement!.value,
        `Expected input to fall back to selected option's value.`,
      ).toContain('test value');
    });

    it('should mark the autocomplete control as dirty as user types', async () => {
      expect(component.control.dirty, `Expected control to start out pristine.`).toBe(false);

      const input = component.autocomplete().triggerElement!;
      input.value = 'a';
      input.dispatchEvent(new InputEvent('input'));
      fixture.detectChanges();

      expect(
        component.control.dirty,
        `Expected control to become dirty when the user types into the input.`,
      ).toBe(true);
    });

    it('should mark the autocomplete control as dirty when an option is selected', async () => {
      expect(component.control.dirty, `Expected control to start out pristine.`).toBe(false);

      const autocomplete = component.autocomplete();
      autocomplete.open();
      expect(autocomplete.isOpen).toBe(true);

      const options = (fixture.nativeElement as HTMLElement).querySelectorAll('sbb-option')!;
      options[1].click();
      fixture.detectChanges();

      expect(
        component.control.dirty,
        `Expected control to become dirty when an option was selected.`,
      ).toBe(true);
    });

    it('should not mark the control dirty when the value is set programmatically', () => {
      expect(component.control.dirty, `Expected control to start out pristine.`).toBe(false);

      component.control.setValue({ property: 'other', otherProp: 'other' });
      fixture.detectChanges();

      expect(
        component.control.dirty,
        `Expected control to stay pristine if value is set programmatically.`,
      ).toBe(false);
    });

    it('should mark the autocomplete control as touched on blur', () => {
      const autocomplete = component.autocomplete();
      autocomplete.open();
      expect(autocomplete.isOpen).toBe(true);
      fixture.detectChanges();

      expect(component.control.touched, `Expected control to start out untouched.`).toBe(false);

      const input = component.autocomplete().triggerElement!;
      input.dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();

      expect(component.control.touched, `Expected control to become touched on blur.`).toBe(true);
    });

    it('should mark the control dirty when selecting an option from the keyboard', async () => {
      expect(component.control.dirty, `Expected control to start out pristine.`).toBe(false);

      const input = component.autocomplete().triggerElement!;

      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      fixture.detectChanges();

      expect(
        component.control.dirty,
        `Expected control to become dirty when option was selected by ENTER.`,
      ).toBe(true);
      expect(component.autocomplete().triggerElement!.value).toEqual('value 2');
    });
  });

  describe('with autocomplete outside form-field', () => {
    let fixture: ComponentFixture<TestComponentWithExternalAutocomplete>,
      component: TestComponentWithExternalAutocomplete;

    beforeEach(async () => {
      fixture = TestBed.createComponent(TestComponentWithExternalAutocomplete);
      component = fixture.componentInstance;
      fixture.detectChanges();

      // Wait for the fixture to stabilize
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    it('should create and link autocomplete via directive', async () => {
      expect(component).toBeDefined();
      const autocomplete = component.autocomplete();
      expect(autocomplete).toBeDefined();
      expect(autocomplete.triggerElement).toBe(
        fixture.debugElement.nativeElement.querySelector('input'),
      );
      expect(autocomplete.origin).toBe(
        fixture.debugElement.nativeElement.querySelector('sbb-form-field'),
      );
    });
  });
});

@Component({
  template: `<sbb-form-field>
    <label for="input">Autocomplete</label>
    <input id="input" [formControl]="control" />
    <sbb-autocomplete>
      @for (opt of [1, 2, 3]; track opt) {
        <sbb-option value="option{{ opt }}">Option {{ opt }}</sbb-option>
      }
    </sbb-autocomplete>
  </sbb-form-field>`,
  imports: [SbbFormField, SbbAutocomplete, SbbOption, ReactiveFormsModule],
})
class TestComponent {
  autocomplete = viewChild.required(SbbAutocomplete);
  control = new FormControl('');
}

@Component({
  template: `<sbb-form-field>
    <label for="input">Autocomplete</label>
    <input id="input" [formControl]="control" [sbbAutocomplete]="auto" />
    <sbb-autocomplete
      [displayWith]="displayWith"
      #auto="sbbAutocomplete"
      (optionSelected)="optionSelected($event)"
    >
      @for (value of values; track value) {
        <sbb-option [value]="value">{{ value.property }}</sbb-option>
      }
    </sbb-autocomplete>
  </sbb-form-field>`,
  imports: [SbbFormField, SbbAutocompleteModule, SbbOption, ReactiveFormsModule],
})
class TestComponentWithComplexValue {
  values = [
    { property: 'value 1', otherProp: 'test' },
    { property: 'value 2', otherProp: 'other test' },
  ];
  autocomplete = viewChild.required(SbbAutocomplete);
  options = viewChildren(SbbOption);
  control = new FormControl(this.values[0]);
  displayWith: ((value: { property: string; otherProperty: string }) => string) | null = (value) =>
    value ? value.property : value;

  optionSelected(_event: Event) {
    // noop;
  }
}

@Component({
  template: `
    <sbb-form-field>
      <label for="input">Autocomplete External</label>
      <input id="input" [formControl]="control" [sbbAutocomplete]="auto" />
    </sbb-form-field>

    <sbb-autocomplete #auto="sbbAutocomplete">
      @for (opt of [1, 2, 3]; track opt) {
        <sbb-option value="external{{ opt }}">External Option {{ opt }}</sbb-option>
      }
    </sbb-autocomplete>
  `,
  imports: [SbbFormField, SbbAutocompleteModule, SbbOption, ReactiveFormsModule],
})
class TestComponentWithExternalAutocomplete {
  autocomplete = viewChild.required(SbbAutocomplete);
  control = new FormControl('');
}
