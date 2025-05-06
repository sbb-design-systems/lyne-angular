import { Component, ElementRef, viewChild } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { SbbFormField } from './form-field';

describe('sbb-form-field', () => {
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
      (fixture.nativeElement as HTMLElement)
        .querySelector('sbb-form-field')!
        .hasAttribute('data-invalid'),
    ).toBe(true);
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
