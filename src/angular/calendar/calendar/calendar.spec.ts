import { Component, signal, viewChild } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';

import { SbbCalendar } from './calendar';

describe('sbb-calendar', () => {
  describe('signal form', () => {
    let fixture: ComponentFixture<SignalTestComponent>, test: SignalTestComponent;

    beforeEach(async () => {
      fixture = TestBed.createComponent(SignalTestComponent);
      test = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', async () => {
      expect(test).toBeDefined();
    });

    it('should update state of component on form value change', async () => {
      const testValue = new Date('2026-06-05');
      test.form().value.set(testValue);
      await fixture.whenStable();

      expect(test.component().value.toDateString()).toBe(testValue.toDateString());
    });

    it('should update form control', async () => {
      const testValue = new Date('2026-06-07');
      const calendar = (fixture.nativeElement as HTMLElement).querySelector('sbb-calendar')!;
      calendar.value = testValue;
      calendar.dispatchEvent(new Event('change'));

      expect(test.component().value.toDateString()).toBe(testValue.toDateString());
      expect(test.form().value().toDateString()).toBe(testValue.toDateString());
      expect(test.form().touched()).toBeTruthy();
    });

    it('should be touched on blur', async () => {
      expect(test.form().touched()).toBeFalsy();

      (fixture.nativeElement as HTMLElement)
        .querySelector('sbb-calendar')!
        .dispatchEvent(new FocusEvent('blur'));

      expect(test.form().touched()).toBeTruthy();
    });
  });

  describe('reactive form', () => {
    let fixture: ComponentFixture<ReactiveTestComponent>, test: ReactiveTestComponent;

    beforeEach(async () => {
      fixture = TestBed.createComponent(ReactiveTestComponent);
      test = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should update state of component on form value change', async () => {
      const testValue = new Date('2026-06-05');
      test.form.setValue(testValue);

      expect(test.component().value.toDateString()).toBe(testValue.toDateString());
    });

    it('should update form control', async () => {
      const testValue = new Date('2026-06-07');
      const calendar = (fixture.nativeElement as HTMLElement).querySelector('sbb-calendar')!;
      calendar.value = testValue;
      calendar.dispatchEvent(new Event('change'));

      expect(test.component().value.toDateString()).toBe(testValue.toDateString());
      expect(test.form.value.toDateString()).toBe(testValue.toDateString());
      expect(test.form.touched).toBeTruthy();
    });

    it('should be touched on blur', async () => {
      expect(test.form.touched).toBeFalsy();

      (fixture.nativeElement as HTMLElement)
        .querySelector('sbb-calendar')!
        .dispatchEvent(new FocusEvent('blur'));

      expect(test.form.touched).toBeTruthy();
    });
  });
});

@Component({
  template: ` <sbb-calendar [formControl]="form"></sbb-calendar>`,
  imports: [SbbCalendar, ReactiveFormsModule],
})
class ReactiveTestComponent {
  public component = viewChild.required(SbbCalendar);

  form = new FormControl(new Date(Date.now()), { nonNullable: true });
}

@Component({
  template: ` <sbb-calendar [formField]="form"></sbb-calendar>`,
  imports: [SbbCalendar, FormField],
})
class SignalTestComponent {
  public component = viewChild.required(SbbCalendar);

  form = form(signal(new Date(Date.now())));
}
