import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbSeatReservationNavigationCoach } from './seat-reservation-navigation-coach';

describe('sbb-seat-reservation-navigation-coach', () => {
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
  template: `<sbb-seat-reservation-navigation-coach></sbb-seat-reservation-navigation-coach>`,
  imports: [SbbSeatReservationNavigationCoach],
})
class TestComponent {}
