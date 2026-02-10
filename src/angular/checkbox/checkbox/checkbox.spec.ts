import { Component, viewChild } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import type { SbbCheckboxElement } from '@sbb-esta/lyne-elements/checkbox/checkbox.js';

import { SbbCheckbox } from './checkbox';

describe(`sbb-checkbox`, () => {
  let fixture: ComponentFixture<TestComponent>,
    component: TestComponent,
    lyneElement: SbbCheckboxElement;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    lyneElement = (fixture.nativeElement as HTMLElement).querySelector('sbb-checkbox')!;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });

  it('should not be checked', async () => {
    expect(component.checkbox().checked).toBe(false);
  });

  it('should be checked', async () => {
    component.control.setValue(true);

    expect(component.checkbox().checked).toBe(true);
  });

  it('should uncheck', async () => {
    component.control.setValue(true);
    expect(component.checkbox().checked).toBe(true);

    component.control.setValue(false);
    expect(component.checkbox().checked).toBe(false);
  });

  it('should check by click and update touched and dirty', async () => {
    expect(component.control.touched).toBe(false);
    expect(component.control.dirty).toBe(false);

    lyneElement.focus();
    lyneElement.click();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.checkbox().checked).toBe(true);
    expect(component.control.value).toBe(true);

    // Simulate click away from checkbox
    lyneElement.dispatchEvent(new FocusEvent('blur'));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.control.dirty).toBe(true);
    expect(component.control.touched).toBe(true);
  });

  it('should be unchecked by click', async () => {
    component.control.setValue(true);

    lyneElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.checkbox().checked).toBe(false);
    expect(component.control.value).toBe(false);
  });

  it('should handle disabled', async () => {
    component.control.disable();
    expect(component.checkbox().disabled).toBe(true);

    component.control.enable();
    expect(component.checkbox().disabled).toBe(false);
  });

  it('should handle validation', async () => {
    component.control.addValidators(Validators.requiredTrue);
    component.control.setValue(false);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(lyneElement.classList.contains('ng-invalid')).toBe(true);

    lyneElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(lyneElement.classList.contains('ng-valid')).toBe(true);
  });
});

@Component({
  template: `<sbb-checkbox [formControl]="control">Checkbox</sbb-checkbox>`,
  imports: [SbbCheckbox, ReactiveFormsModule],
})
class TestComponent {
  control = new FormControl(false);
  checkbox = viewChild.required(SbbCheckbox);
}
