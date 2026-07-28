/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  ElementRef,
  forwardRef,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import type { ControlValueAccessor } from '@angular/forms';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  disabled,
  form,
  FormField,
  readonly,
  required,
  type FormValueControl,
} from '@angular/forms/signals';
import { Subject } from 'rxjs';

import { SbbFormField } from './form-field';
import { SbbFormFieldControl } from './form-field-control';

describe('sbb-form-field', () => {
  describe('input', () => {
    let fixture: ComponentFixture<TestComponent>, component: TestComponent;

    beforeEach(async () => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', async () => {
      expect(component).toBeDefined();
    });

    it('should detect invalid state', async () => {
      component.control.markAsTouched();

      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.control.invalid).toBe(true);
      expect(component.control.touched).toBe(true);

      // Wait for attribute observer to run
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(
        getComputedStyle(
          (fixture.nativeElement as HTMLElement).querySelector('sbb-form-field')!,
        ).getPropertyValue('--sbb-form-field-border-color'),
      ).toBe('light-dark(#c60018, #ff3838)');
    });
  });

  describe('custom control', () => {
    let fixture: ComponentFixture<CustomControlTestComponent>,
      component: CustomControlTestComponent;

    const hasState = (state: string): boolean =>
      (fixture.nativeElement as HTMLElement)
        .querySelector('sbb-form-field')!
        .matches(`:state(${state})`);

    beforeEach(async () => {
      fixture = TestBed.createComponent(CustomControlTestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', async () => {
      expect(component).toBeDefined();
    });

    it('should detect invalid state', async () => {
      component.control.markAsTouched();

      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.control.invalid).toBe(true);
      expect(component.control.touched).toBe(true);

      // Wait for attribute observer to run
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(
        getComputedStyle(
          (fixture.nativeElement as HTMLElement).querySelector('sbb-form-field')!,
        ).getPropertyValue('--sbb-form-field-border-color'),
      ).toBe('light-dark(#c60018, #ff3838)');
    });

    it('should reflect changed disabled state', async () => {
      const input = component.input()!;
      input.disabled = true;
      input.stateChanges.next();
      await fixture.whenStable();
      expect(hasState('disabled')).toBeTruthy();
    });

    it('should reflect changed empty state', async () => {
      const input = component.input()!;
      input.empty = true;
      input.stateChanges.next();
      await fixture.whenStable();
      expect(hasState('empty')).toBeTruthy();
    });

    it('should reflect changed readOnly state', async () => {
      const input = component.input()!;
      input.readOnly = true;
      input.stateChanges.next();
      await fixture.whenStable();
      expect(hasState('readonly')).toBeTruthy();
    });

    it('should focus the inner input with onContainerClick', async () => {
      const input = component.input()!;
      const focusSpy = vi.spyOn(input.input()!.nativeElement!, 'focus');
      input.onContainerClick(new MouseEvent('click'));
      expect(focusSpy).toHaveBeenCalled();
    });
  });

  describe('signal custom control', () => {
    let fixture: ComponentFixture<SignalCustomControlTestComponent>,
      component: SignalCustomControlTestComponent;

    const hasState = (state: string): boolean =>
      (fixture.nativeElement as HTMLElement)
        .querySelector('sbb-form-field')!
        .matches(`:state(${state})`);

    beforeEach(async () => {
      fixture = TestBed.createComponent(SignalCustomControlTestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', async () => {
      expect(component).toBeDefined();
    });

    it('should detect invalid state', async () => {
      component.input()!.touch.emit();

      fixture.detectChanges();
      await fixture.whenStable();

      const formField = component.formField();
      const state = formField.state();

      expect(state.invalid()).toBe(true);
      expect(state.touched()).toBe(true);

      // Wait for attribute observer to run
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(
        getComputedStyle(
          (fixture.nativeElement as HTMLElement).querySelector('sbb-form-field')!,
        ).getPropertyValue('--sbb-form-field-border-color'),
      ).toBe('light-dark(#c60018, #ff3838)');
    });

    it('should reflect changed disabled state', async () => {
      component.disabled.set(true);
      await fixture.whenStable();
      expect(hasState('disabled')).toBeTruthy();
      component.disabled.set(false);
      await fixture.whenStable();
      expect(hasState('disabled')).toBeFalsy();
    });

    it('should reflect changed empty state', async () => {
      await fixture.whenStable();
      expect(hasState('empty')).toBeTruthy();
      component.control().value.set('value');
      await fixture.whenStable();
      expect(hasState('empty')).toBeFalsy();
    });

    it('should reflect changed readOnly state', async () => {
      component.readonly.set(true);
      await fixture.whenStable();
      expect(hasState('readonly')).toBeTruthy();
      component.readonly.set(false);
      await fixture.whenStable();
      expect(hasState('readonly')).toBeFalsy();
    });

    it('should focus the inner input with onContainerClick', async () => {
      const formField = component.formField();
      formField.focus();

      const focusedElement = document.activeElement;
      expect(focusedElement).toBeDefined();
      expect(focusedElement).toHaveClass('sbb-signal-custom-control-span');
    });
  });
});

@Component({
  template: `<sbb-form-field><input [formControl]="control" #input /></sbb-form-field>`,
  imports: [SbbFormField, ReactiveFormsModule],
})
class TestComponent {
  control = new FormControl('', Validators.required);
  input = viewChild<ElementRef<HTMLInputElement>>(ElementRef<HTMLInputElement>);
}

@Component({
  selector: 'sbb-custom-control',
  template: `<input (input)="onChange($event.target.value)" (blur)="onTouched()" #input />`,
  host: {
    '[id]': 'id',
  },
  providers: [
    { provide: SbbFormFieldControl, useExisting: forwardRef(() => CustomControlComponent) },
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CustomControlComponent),
    },
  ],
})
class CustomControlComponent implements SbbFormFieldControl, ControlValueAccessor {
  input = viewChild<ElementRef<HTMLInputElement>>('input');
  stateChanges = new Subject<void>();
  id: string = 'custom-control';
  empty: boolean = false;
  disabled: boolean = false;
  readOnly: boolean = false;

  onChange: (value: any) => void = () => undefined;
  onTouched: () => void = () => undefined;

  onContainerClick(_event: MouseEvent): void {
    this.input()?.nativeElement.focus();
  }

  writeValue(value: any): void {
    const input = this.input();
    if (input) {
      input.nativeElement.value = value;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    const input = this.input();
    if (input) {
      input.nativeElement.disabled = isDisabled;
    }
  }
}

@Component({
  selector: 'sbb-custom-control-test',
  template: `<sbb-form-field
    ><sbb-custom-control [formControl]="control" #input
  /></sbb-form-field>`,
  imports: [SbbFormField, CustomControlComponent, ReactiveFormsModule],
})
class CustomControlTestComponent {
  control = new FormControl('', Validators.required);
  input = viewChild<CustomControlComponent>('input');
}

@Component({
  selector: 'sbb-signal-custom-control',
  template: `<span class="sbb-signal-custom-control-span" tabindex="0">{{ value() }}</span>`,
})
class SignalCustomControlComponent implements FormValueControl<string> {
  #element = inject(ElementRef<HTMLElement>);
  value = model('');
  disabled = input(false);
  readonly = input(false);
  touched = input(false);
  touch = output();

  focus?(options?: FocusOptions): void {
    this.#element.nativeElement.querySelector('.sbb-signal-custom-control-span')?.focus(options);
  }
}

@Component({
  selector: 'sbb-signal-custom-control-test',
  template: `<sbb-form-field
    ><sbb-signal-custom-control [formField]="control" #input
  /></sbb-form-field>`,
  imports: [SbbFormField, SignalCustomControlComponent, FormField],
})
class SignalCustomControlTestComponent {
  input = viewChild<SignalCustomControlComponent>('input');
  formField = viewChild.required(FormField<string>);
  disabled = signal(false);
  readonly = signal(false);
  control = form(signal(''), (s) => {
    required(s);
    disabled(s, { when: this.disabled });
    readonly(s, { when: this.readonly });
  });
}
