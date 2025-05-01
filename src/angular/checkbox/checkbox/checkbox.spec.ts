import { Component, type ElementRef, viewChild } from '@angular/core';
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
    expect(lyneElement.checked).toBeFalse();
  });

  it('should be checked', async () => {
    component.control.setValue(true);

    expect(lyneElement.checked).toBeTrue();
  });

  it('should uncheck', async () => {
    component.control.setValue(true);
    expect(lyneElement.checked).toBeTrue();

    component.control.setValue(false);
    expect(lyneElement.checked).toBeFalse();
  });

  it('should check by click and update ng-touched and ng-pristine', async () => {
    expect(lyneElement).toHaveClass('ng-untouched');
    expect(lyneElement).toHaveClass('ng-pristine');

    lyneElement.focus();
    lyneElement.click();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(lyneElement.checked).toBeTrue();
    expect(component.control.value).toBeTrue();

    component.button()!.nativeElement!.focus();
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

    expect(lyneElement.checked).toBeFalse();
    expect(component.control.value).toBeFalse();
  });

  it('should handle disabled', async () => {
    component.control.disable();
    expect(lyneElement.disabled).toBeTrue();

    component.control.enable();
    expect(lyneElement.disabled).toBeFalse();
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
  template: `<form>
    <sbb-checkbox [formControl]="control">Checkbox</sbb-checkbox>
    <button #button type="button">Blur</button>
  </form>`,
  imports: [SbbCheckbox, ReactiveFormsModule],
})
class TestComponent {
  control = new FormControl(false);
  button = viewChild<ElementRef<HTMLButtonElement>>('button');
}
