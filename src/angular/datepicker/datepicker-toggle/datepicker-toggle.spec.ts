import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbDatepickerToggle } from './datepicker-toggle';

describe('sbb-datepicker-toggle', () => {
  let fixture: ComponentFixture<TestComponent>, component: TestComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});

@Component({
  template: `<sbb-datepicker-toggle></sbb-datepicker-toggle>`,
  imports: [SbbDatepickerToggle],
})
class TestComponent {}
