import { Component, viewChild } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field/form-field';
import { SbbOption } from '@sbb-esta/lyne-angular/option/option';

import { SbbAutocomplete } from './autocomplete';

describe('sbb-autocomplete', () => {
  let fixture: ComponentFixture<TestComponent>, component: TestComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });

  it('should open and close', async () => {
    const autocomplete = component.autocomplete();
    autocomplete.open();

    expect(autocomplete.isOpen).toBeTrue();

    const option1 = (fixture.nativeElement as HTMLElement).querySelector('sbb-option')!;
    option1.click();

    expect(component.control.value).toEqual('option1');
    expect(autocomplete.isOpen).toBeFalse();
  });
});

@Component({
  template: `<sbb-form-field>
    <label for="input">Autocomplete</label>
    <input id="input" [formControl]="control" />
    <sbb-autocomplete>
      <sbb-option value="option1">Option 1</sbb-option>
      <sbb-option value="option2">Option 2</sbb-option>
    </sbb-autocomplete>
  </sbb-form-field>`,
  imports: [SbbFormField, SbbAutocomplete, SbbOption, ReactiveFormsModule],
})
class TestComponent {
  autocomplete = viewChild.required(SbbAutocomplete);
  control = new FormControl('');
}
