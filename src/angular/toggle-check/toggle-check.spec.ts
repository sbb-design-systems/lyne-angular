import { Component, viewChild } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import type { SbbToggleCheckElement } from '@sbb-esta/lyne-elements/toggle-check.js';

import { SbbToggleCheck } from './toggle-check';

describe(`sbb-toggle-check`, () => {
  let fixture: ComponentFixture<TestComponent>,
    component: TestComponent,
    lyneElement: SbbToggleCheckElement;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    lyneElement = (fixture.nativeElement as HTMLElement).querySelector('sbb-toggle-check')!;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });

  it('should not be checked', async () => {
    expect(component.checkbox().checked).toBeFalse();
  });

  it('should be checked', async () => {
    component.control.setValue(true);

    expect(component.checkbox().checked).toBeTrue();
  });

  it('should uncheck', async () => {
    component.control.setValue(true);
    expect(component.checkbox().checked).toBeTrue();

    component.control.setValue(false);
    expect(component.checkbox().checked).toBeFalse();
  });

  it('should check by click and update ng-touched and ng-pristine', async () => {
    expect(lyneElement).toHaveClass('ng-untouched');
    expect(lyneElement).toHaveClass('ng-pristine');

    lyneElement.focus();
    lyneElement.click();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.checkbox().checked).toBeTrue();
    expect(component.control.value).toBeTrue();

    // Simulate click away from checkbox
    lyneElement.dispatchEvent(new FocusEvent('blur'));

    // We need to wait two cycles until touched is set on host
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(lyneElement).toHaveClass('ng-dirty');
    expect(lyneElement).toHaveClass('ng-touched');
  });

  it('should be unchecked by click', async () => {
    component.control.setValue(true);

    lyneElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.checkbox().checked).toBeFalse();
    expect(component.control.value).toBeFalse();
  });

  it('should handle disabled', async () => {
    component.control.disable();
    expect(component.checkbox().disabled).toBeTrue();

    component.control.enable();
    expect(component.checkbox().disabled).toBeFalse();
  });

  it('should handle validation', async () => {
    component.control.addValidators(Validators.requiredTrue);
    component.control.setValue(false);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(lyneElement).toHaveClass('ng-invalid');

    lyneElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(lyneElement).toHaveClass('ng-valid');
  });
});

@Component({
  template: `<sbb-toggle-check [formControl]="control">Checkbox</sbb-toggle-check>`,
  imports: [SbbToggleCheck, ReactiveFormsModule],
})
class TestComponent {
  control = new FormControl(false);
  checkbox = viewChild.required(SbbToggleCheck);
}
