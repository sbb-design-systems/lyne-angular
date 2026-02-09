import { Component, viewChild, viewChildren } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import type { SbbRadioButtonElement } from '@sbb-esta/lyne-elements/radio-button/radio-button.js';

import { SbbRadioButton } from '../radio-button';

import { SbbRadioButtonGroup } from './radio-button-group';

describe('sbb-radio-button-group', () => {
  let fixture: ComponentFixture<TestComponent>, component: TestComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Wait for the underlying web component to be ready
    await Promise.resolve();
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
});

@Component({
  template: `<sbb-radio-button-group [formControl]="control">
    <sbb-radio-button name="test" value="opt1"></sbb-radio-button>
    <sbb-radio-button name="test" value="opt2"></sbb-radio-button>
    <sbb-radio-button name="test" value="opt3"></sbb-radio-button>
  </sbb-radio-button-group>`,
  imports: [SbbRadioButtonGroup, ReactiveFormsModule, SbbRadioButton],
})
class TestComponent {
  control = new FormControl('opt2');
  radioButtonGroup = viewChild.required(SbbRadioButtonGroup);
  radioButtons = viewChildren(SbbRadioButton);
}
