import type { QueryList } from '@angular/core';
import { Component, ViewChild, ViewChildren } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

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

    expect(component.toggle.value).toBe('2');
    expect(component.options.find((o) => o.value === '2')!.checked).toBeTrue();

    component.control.setValue('1');
    expect(component.toggle.value).toBe('1');
    expect(component.options.find((o) => o.value === '1')!.checked).toBeTrue();
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
  @ViewChild(SbbToggle, { static: true }) toggle!: SbbToggle;
  @ViewChildren(SbbToggleOption) options!: QueryList<SbbToggleOption>;
  control = new FormControl('2');
}
