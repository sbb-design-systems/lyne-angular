import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbSeatReservationGraphic } from './seat-reservation-graphic';

describe('sbb-seat-reservation-graphic', () => {
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
  template: `<sbb-seat-reservation-graphic></sbb-seat-reservation-graphic>`,
  imports: [SbbSeatReservationGraphic],
})
class TestComponent {}
