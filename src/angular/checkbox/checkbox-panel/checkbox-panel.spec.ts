import { Component, viewChild } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import type { SbbCheckboxPanelElement } from '@sbb-esta/lyne-elements/checkbox/checkbox-panel.js';

import { SbbCheckboxPanel } from './checkbox-panel';

describe('sbb-checkbox-panel', () => {
  let fixture: ComponentFixture<TestComponent>,
    component: TestComponent,
    lyneElement: SbbCheckboxPanelElement;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    lyneElement = (fixture.nativeElement as HTMLElement).querySelector('sbb-checkbox-panel')!;
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

  it('should check by click and update touched and dirty', async () => {
    expect(component.control.touched).toBeFalse();
    expect(component.control.dirty).toBeFalse();

    lyneElement.focus();
    lyneElement.click();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.checkbox().checked).toBeTrue();
    expect(component.control.value).toBeTrue();

    // Simulate click away from checkbox
    lyneElement.dispatchEvent(new FocusEvent('blur'));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.control.dirty).toBeTrue();
    expect(component.control.touched).toBeTrue();
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
  template: `<sbb-checkbox-panel [formControl]="control">Checkbox</sbb-checkbox-panel>`,
  imports: [SbbCheckboxPanel, ReactiveFormsModule],
})
class TestComponent {
  control = new FormControl(false);
  checkbox = viewChild.required(SbbCheckboxPanel);
}
