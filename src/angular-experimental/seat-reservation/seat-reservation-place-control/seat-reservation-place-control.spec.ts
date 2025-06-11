import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbSeatReservationPlaceControl } from './seat-reservation-place-control';

describe('sbb-seat-reservation-place-control', () => {
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
  template: `<sbb-seat-reservation-place-control></sbb-seat-reservation-place-control>`,
  imports: [SbbSeatReservationPlaceControl],
})
class TestComponent {}
