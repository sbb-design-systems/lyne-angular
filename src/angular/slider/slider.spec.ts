import { Component, signal, viewChild } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { disabled, form, FormField, max, min, readonly, required } from '@angular/forms/signals';
import type { SbbSliderElement } from '@sbb-esta/lyne-elements/slider.pure.js';

import { SbbSlider } from './slider';
import { SbbSliderModule } from './slider.module';

describe('sbb-slider', () => {
  let fixture: ComponentFixture<TestComponent>, component: TestComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeDefined();
    expect(component.slider().value).toBe('10');
  });

  it('should update state of component on form value change', async () => {
    component.control.setValue('120');
    expect(component.slider().value).toBe('100');

    component.control.setValue('-20');
    expect(component.slider().value).toBe('0');
  });

  it('should update form control', async () => {
    const slider = (fixture.nativeElement as HTMLElement).querySelector('sbb-slider')!;
    slider.valueAsNumber = 30;
    slider.dispatchEvent(new Event('change'));
    expect(component.slider().value).toBe('30');
  });

  it('should be touched on blur', async () => {
    expect(component.control.touched).toBe(false);

    (fixture.nativeElement as HTMLElement)
      .querySelector('sbb-slider')!
      .dispatchEvent(new FocusEvent('blur'));

    expect(component.control.touched).toBe(true);
  });

  describe('signal forms', () => {
    let fixture: ComponentFixture<SignalTestComponent>,
      component: SignalTestComponent,
      element: SbbSliderElement;

    beforeEach(async () => {
      fixture = TestBed.createComponent(SignalTestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      element = (fixture.nativeElement as HTMLElement).querySelector('sbb-slider')!;
    });

    it('should sync min', async () => {
      component.min.set(20);
      await fixture.whenStable();
      expect(element).toHaveAttribute('min', '20');
      component.min.set(undefined);
      await fixture.whenStable();
      expect(element).not.toHaveAttribute('min');
    });

    it('should sync max', async () => {
      component.max.set(10);
      await fixture.whenStable();
      expect(element).toHaveAttribute('max', '10');
      component.max.set(undefined);
      await fixture.whenStable();
      expect(element).not.toHaveAttribute('max');
    });

    it('should sync disabled', async () => {
      component.disabled.set(true);
      await fixture.whenStable();
      expect(element).toHaveAttribute('disabled');
      component.disabled.set(false);
      await fixture.whenStable();
      expect(element).not.toHaveAttribute('disabled');
    });

    it('should sync readonly', async () => {
      component.readonly.set(true);
      await fixture.whenStable();
      expect(element).toHaveAttribute('readonly');
      component.readonly.set(false);
      await fixture.whenStable();
      expect(element).not.toHaveAttribute('readonly');
    });

    it('should sync required', async () => {
      component.required.set(true);
      await fixture.whenStable();
      expect(element).toHaveAttribute('required');
      component.required.set(false);
      await fixture.whenStable();
      expect(element).not.toHaveAttribute('required');
    });
  });
});

@Component({
  template: `<sbb-slider [formControl]="control" min="0" max="100" />`,
  imports: [SbbSliderModule, ReactiveFormsModule],
})
class TestComponent {
  slider = viewChild.required(SbbSlider);
  control = new FormControl('10');
}

@Component({
  template: `<sbb-slider [formField]="control"></sbb-slider>`,
  imports: [SbbSliderModule, FormField],
})
class SignalTestComponent {
  slider = viewChild.required(SbbSlider);
  min = signal<number | undefined>(undefined);
  max = signal<number | undefined>(undefined);
  disabled = signal(false);
  readonly = signal(false);
  required = signal(false);
  control = form(signal<number | null>(10), (s) => {
    disabled(s, { when: this.disabled });
    readonly(s, { when: this.readonly });
    required(s, { when: this.required });
    min(s, this.min);
    max(s, this.max);
  });
}
