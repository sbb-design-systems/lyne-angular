import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbCalendarWeeknumber } from './calendar-weeknumber';

describe('sbb-calendar-weeknumber', () => {
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
  template: `<sbb-calendar-weeknumber></sbb-calendar-weeknumber>`,
  imports: [SbbCalendarWeeknumber],
})
class TestComponent {}
