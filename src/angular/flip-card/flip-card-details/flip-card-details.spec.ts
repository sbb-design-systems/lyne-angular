import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbFlipCardDetails } from './flip-card-details';

describe('sbb-flip-card-details', () => {
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
  template: `<sbb-flip-card-details></sbb-flip-card-details>`,
  imports: [SbbFlipCardDetails],
})
class TestComponent {}
