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
