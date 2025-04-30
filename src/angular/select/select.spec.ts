import type { QueryList } from '@angular/core';
import { Component, ViewChild, ViewChildren } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { SbbOption } from '../option/option';

import { SbbSelect } from './select';

describe('sbb-select', () => {
  let fixture: ComponentFixture<TestComponent>, component: TestComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeDefined();

    expect(component.select.value).toEqual('2');
    expect(component.select.getDisplayValue()).toEqual('Option 2');
    expect(component.options.find((o) => o.value === '2')!.selected).toBeTrue();
  });

  it('should select an option', async () => {
    component.select.open();
    fixture.detectChanges();

    fixture.debugElement.nativeElement.querySelector('sbb-option[value="1"]').click();
    fixture.detectChanges();

    expect(component.select.value).toEqual('1');
    expect(component.options.find((o) => o.value === '1')!.selected).toBeTrue();
  });
});

@Component({
  template: `<sbb-select [formControl]="control">
    <sbb-option value="1">Option 1</sbb-option>
    <sbb-option value="2">Option 2</sbb-option>
    <sbb-option value="3">Option 3</sbb-option>
  </sbb-select>`,
  imports: [SbbSelect, SbbOption, ReactiveFormsModule],
})
class TestComponent {
  @ViewChild(SbbSelect, { static: true }) select!: SbbSelect;
  @ViewChildren(SbbOption) options!: QueryList<SbbOption>;
  control = new FormControl('2');
}
