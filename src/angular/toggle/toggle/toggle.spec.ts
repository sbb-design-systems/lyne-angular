import { Component, viewChild, viewChildren } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import type { SbbToggleOptionElement } from '@sbb-esta/lyne-elements/toggle/toggle-option.js';

import { SbbToggleOption } from '../toggle-option';

import { SbbToggle } from './toggle';

describe('sbb-toggle', () => {
  let fixture: ComponentFixture<TestComponent>, component: TestComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeDefined();

    expect(component.toggle().value).toBe('2');
    expect(component.options().find((o) => o.value === '2')!.checked).toBeTrue();
  });

  it('should update state of component on form value change', async () => {
    component.control.setValue('1');
    expect(component.toggle().value).toBe('1');
    expect(component.options().find((o) => o.value === '1')!.checked).toBeTrue();
  });

  it('should update form control when toggling', async () => {
    (fixture.nativeElement as HTMLElement)
      .querySelector<SbbToggleOptionElement>('sbb-toggle-option[value="1"]')!
      .click();

    expect(component.control.value).toBe('1');
  });

  it('should be touched on blur', async () => {
    expect(component.control.touched).toBeFalse();

    (fixture.nativeElement as HTMLElement)
      .querySelector('sbb-toggle')!
      .dispatchEvent(new FocusEvent('focusout'));

    expect(component.control.touched).toBeTrue();
  });
});

@Component({
  template: `<sbb-toggle [formControl]="control">
    <sbb-toggle-option value="1">Value 1</sbb-toggle-option>
    <sbb-toggle-option value="2">Value 2</sbb-toggle-option>
  </sbb-toggle>`,
  imports: [SbbToggle, SbbToggleOption, ReactiveFormsModule],
})
class TestComponent {
  toggle = viewChild.required(SbbToggle);
  options = viewChildren(SbbToggleOption);
  control = new FormControl('2');
}
