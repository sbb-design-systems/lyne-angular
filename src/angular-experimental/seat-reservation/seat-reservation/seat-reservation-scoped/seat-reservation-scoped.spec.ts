import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbSeatReservationScoped } from './seat-reservation-scoped';

describe('sbb-seat-reservation-scoped', () => {
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
  template: `<sbb-seat-reservation-scoped></sbb-seat-reservation-scoped>`,
  imports: [SbbSeatReservationScoped],
})
class TestComponent {}
