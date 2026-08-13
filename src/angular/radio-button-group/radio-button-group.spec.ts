import { Component, signal, viewChild, viewChildren } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import type { SbbRadioButtonElement } from '@sbb-esta/lyne-elements/radio-button.pure.js';

import { SbbRadioButton } from '../radio-button';

import { SbbRadioButtonGroup } from './radio-button-group';

describe('sbb-radio-button-group', () => {
  describe('signal forms', () => {
    let fixture: ComponentFixture<SignalTestComponent>, component: SignalTestComponent;

    beforeEach(async () => {
      fixture = TestBed.createComponent(SignalTestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', async () => {
      expect(component).toBeDefined();
      expect(component.radioButtonGroup().value).toBe('opt2');
      expect(component.radioButtons()![1].checked).toBe(true);
    });

    it('should update form control', async () => {
      (fixture.nativeElement as HTMLElement)
        .querySelector<SbbRadioButtonElement>('sbb-radio-button[value="opt1"]')!
        .click();
      expect(component.radioButtonGroup().value).to.be.equal('opt1');
      expect(component.control().value()).toBe('opt1');
    });

    it('should update component', async () => {
      component.control().value.set('opt1');
      await fixture.whenStable();

      expect(component.radioButtonGroup().value).to.be.equal('opt1');
      expect(component.control().value()).toBe('opt1');
    });

    it('should be touched', async () => {
      const radioButtonElement = (
        fixture.nativeElement as HTMLElement
      ).querySelector<SbbRadioButtonElement>('sbb-radio-button[value="opt1"]')!;
      const radioButtonGroupElement = (fixture.nativeElement as HTMLElement).querySelector(
        'sbb-radio-button-group',
      )!;

      radioButtonElement.focus();
      radioButtonGroupElement.dispatchEvent(new FocusEvent('focusout'));
      fixture.detectChanges();

      expect(component.control().touched()).toBe(true);
    });

    it('should handle keyboard navigation', async () => {
      const activeRadio = (
        fixture.nativeElement as HTMLElement
      ).querySelector<SbbRadioButtonElement>('sbb-radio-button[value="opt2"]')!;

      const nextRadio = (fixture.nativeElement as HTMLElement).querySelector<SbbRadioButtonElement>(
        'sbb-radio-button[value="opt3"]',
      )!;

      activeRadio.focus();
      activeRadio.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

      await fixture.whenStable();

      expect(document.activeElement).to.be.equal(nextRadio);
      expect(component.control().value()).to.be.equal('opt3');
    });
  });

  describe('compareWith', () => {
    let fixture: ComponentFixture<ComplexValueTestComponent>, component: ComplexValueTestComponent;

    beforeEach(async () => {
      fixture = TestBed.createComponent(ComplexValueTestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', async () => {
      expect(component).toBeDefined();
      expect(component.radioButtonGroup().value).toMatchObject({ id: 1, name: 'one' });
      expect(component.radioButtons()![0].checked).toBe(true);
    });

    it('should update value', async () => {
      component.radioButtonGroup().value = { id: 0 };
      expect(component.radioButtons()!.every((e) => e.checked)).toBe(false);

      component.radioButtonGroup().value = { id: 3 };
      expect(component.radioButtons()!.map((e) => e.checked)).toEqual([false, false, true]);
    });
  });

  describe('reactive forms', () => {
    let fixture: ComponentFixture<ReactiveTestComponent>, component: ReactiveTestComponent;

    beforeEach(async () => {
      fixture = TestBed.createComponent(ReactiveTestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', async () => {
      expect(component).toBeDefined();
      expect(component.radioButtonGroup().value).toBe('opt2');
      expect(component.radioButtons()![1].checked).toBe(true);
    });

    it('should update form control', async () => {
      (fixture.nativeElement as HTMLElement)
        .querySelector<SbbRadioButtonElement>('sbb-radio-button[value="opt1"]')!
        .click();
      expect(component.radioButtonGroup().value).to.be.equal('opt1');
      expect(component.control.value).toBe('opt1');
    });

    it('should update component', async () => {
      component.control.setValue('opt1');
      await fixture.whenStable();

      expect(component.radioButtonGroup().value).to.be.equal('opt1');
      expect(component.control.value).toBe('opt1');
    });

    it('should be touched', async () => {
      const radioButtonElement = (
        fixture.nativeElement as HTMLElement
      ).querySelector<SbbRadioButtonElement>('sbb-radio-button[value="opt1"]')!;
      const radioButtonGroupElement = (fixture.nativeElement as HTMLElement).querySelector(
        'sbb-radio-button-group',
      )!;

      radioButtonElement.focus();
      radioButtonGroupElement.dispatchEvent(new FocusEvent('focusout'));
      fixture.detectChanges();

      expect(component.control.touched).toBe(true);
    });

    it('should handle keyboard navigation', async () => {
      const activeRadio = (
        fixture.nativeElement as HTMLElement
      ).querySelector<SbbRadioButtonElement>('sbb-radio-button[value="opt2"]')!;

      const nextRadio = (fixture.nativeElement as HTMLElement).querySelector<SbbRadioButtonElement>(
        'sbb-radio-button[value="opt3"]',
      )!;

      activeRadio.focus();
      activeRadio.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

      await fixture.whenStable();

      expect(document.activeElement).to.be.equal(nextRadio);
      expect(component.control.value).to.be.equal('opt3');
    });
  });
});

@Component({
  template: `<sbb-radio-button-group [formField]="control">
    <sbb-radio-button name="test" value="opt1"></sbb-radio-button>
    <sbb-radio-button name="test" value="opt2"></sbb-radio-button>
    <sbb-radio-button name="test" value="opt3"></sbb-radio-button>
  </sbb-radio-button-group>`,
  imports: [SbbRadioButtonGroup, FormField, SbbRadioButton],
})
class SignalTestComponent {
  control = form(signal('opt2'));
  radioButtonGroup = viewChild.required(SbbRadioButtonGroup);
  radioButtons = viewChildren(SbbRadioButton);
}

@Component({
  template: `<sbb-radio-button-group [formControl]="control">
    <sbb-radio-button name="test" value="opt1"></sbb-radio-button>
    <sbb-radio-button name="test" value="opt2"></sbb-radio-button>
    <sbb-radio-button name="test" value="opt3"></sbb-radio-button>
  </sbb-radio-button-group>`,
  imports: [SbbRadioButtonGroup, ReactiveFormsModule, SbbRadioButton],
})
class ReactiveTestComponent {
  control = new FormControl('opt2');
  radioButtonGroup = viewChild.required(SbbRadioButtonGroup);
  radioButtons = viewChildren(SbbRadioButton);
}

@Component({
  template: `<sbb-radio-button-group [formField]="control" [compareWith]="compareWith">
    <sbb-radio-button name="test" [value]="values[0]"></sbb-radio-button>
    <sbb-radio-button name="test" [value]="values[1]"></sbb-radio-button>
    <sbb-radio-button name="test" [value]="values[2]"></sbb-radio-button>
  </sbb-radio-button-group>`,
  imports: [SbbRadioButtonGroup, FormField, SbbRadioButton],
})
class ComplexValueTestComponent {
  control = form(signal({ id: 1 }));
  radioButtonGroup = viewChild.required(SbbRadioButtonGroup);
  radioButtons = viewChildren(SbbRadioButton);
  values = [
    { id: 1, name: 'one' },
    { id: 2, name: 'two' },
    { id: 3, name: 'three' },
  ];
  compareWith = (v1: { id: number } | null, v2: { id: number } | null) => v1?.id === v2?.id;
}
