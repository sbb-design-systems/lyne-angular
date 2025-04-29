import type { ElementRef } from '@angular/core';
import { Component, viewChild } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import type { SbbToggleCheckElement } from '@sbb-esta/lyne-elements/toggle-check.js';

import { SbbToggleCheck } from './toggle-check';

describe('toggle-check', () => {
  let fixture: ComponentFixture<TestComponent>, lyneElement: SbbToggleCheckElement;

  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
    });

    await customElements.whenDefined('sbb-toggle-check');
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    lyneElement = (fixture.debugElement.nativeElement as HTMLElement).querySelector(
      'sbb-toggle-check',
    )!;
  }));

  it('should not be checked', async () => {
    expect(lyneElement.checked).toBeFalse();
  });

  it('should be checked', async () => {
    fixture.componentInstance.control.setValue(true);

    expect(lyneElement.checked).toBeTrue();
  });

  it('should uncheck', async () => {
    fixture.componentInstance.control.setValue(true);
    expect(lyneElement.checked).toBeTrue();

    fixture.componentInstance.control.setValue(false);
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
    expect(fixture.componentInstance.control.value).toBeTrue();

    fixture.componentInstance.button()!.nativeElement!.focus();
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
    fixture.componentInstance.control.setValue(true);

    lyneElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(lyneElement.checked).toBeFalse();
    expect(fixture.componentInstance.control.value).toBeFalse();
  });

  it('should handle disabled', async () => {
    fixture.componentInstance.control.disable();
    expect(lyneElement.disabled).toBeTrue();

    fixture.componentInstance.control.enable();
    expect(lyneElement.disabled).toBeFalse();
  });

  it('should handle validation', async () => {
    fixture.componentInstance.control.addValidators(Validators.requiredTrue);
    fixture.componentInstance.control.setValue(false);
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
    <sbb-toggle-check [formControl]="control">Checkbox</sbb-toggle-check>
    <button #button (click)="buttonClicked($event)">Blur</button>
  </form>`,
  imports: [SbbToggleCheck, ReactiveFormsModule],
})
class TestComponent {
  control = new FormControl(false);
  button = viewChild<ElementRef<HTMLButtonElement>>('button');
  buttonClicked(event: Event) {
    // Prevent test page reload
    event.preventDefault();
  }
}
