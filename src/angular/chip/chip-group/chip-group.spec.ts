import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field/form-field';

import { SbbChipGroup } from './chip-group';

describe('sbb-chip-group', () => {
  let fixture: ComponentFixture<TestComponent>, component: TestComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeDefined();

    const nativeElement = fixture.debugElement.nativeElement as HTMLElement;
    const input = nativeElement.querySelector('input')!;

    // Simulate user typing in the input
    input.value = 'Option';
    input.dispatchEvent(new InputEvent('input'));
    fixture.detectChanges();
    await fixture.whenStable();
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Select an option from the autocomplete
    nativeElement.querySelector('sbb-option')!.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.control.value).toEqual(['chip 1', 'Option A']);
  });
});

@Component({
  template: `<sbb-form-field>
    <label for="input">Label</label>
    <sbb-chip-group [formControl]="control">
      <input id="input" placeholder="Placeholder" />
    </sbb-chip-group>
    <sbb-autocomplete>
      <sbb-option value="Option A">Option A</sbb-option>
      <sbb-option value="Option B">Option B</sbb-option>
    </sbb-autocomplete>
  </sbb-form-field>`,
  imports: [SbbChipGroup, SbbFormField, ReactiveFormsModule],
})
class TestComponent {
  control = new FormControl(['chip 1']);
}
