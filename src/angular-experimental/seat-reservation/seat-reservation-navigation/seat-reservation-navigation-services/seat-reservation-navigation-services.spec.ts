import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbSeatReservationNavigationServices } from './seat-reservation-navigation-services';

describe('sbb-seat-reservation-navigation-services', () => {
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
  template: `<sbb-seat-reservation-navigation-services></sbb-seat-reservation-navigation-services>`,
  imports: [SbbSeatReservationNavigationServices],
})
class TestComponent {}
