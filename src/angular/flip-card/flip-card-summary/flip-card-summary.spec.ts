import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbFlipCardSummary } from './flip-card-summary';

describe('sbb-flip-card-summary', () => {
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
  template: `<sbb-flip-card-summary></sbb-flip-card-summary>`,
  imports: [SbbFlipCardSummary],
})
class TestComponent {}
