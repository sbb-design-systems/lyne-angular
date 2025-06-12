import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbSeatReservationArea } from './seat-reservation-area';

describe('sbb-seat-reservation-area', () => {
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
  template: `<sbb-seat-reservation-area></sbb-seat-reservation-area>`,
  imports: [SbbSeatReservationArea],
})
class TestComponent {}
