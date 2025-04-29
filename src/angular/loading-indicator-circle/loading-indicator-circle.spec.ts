import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbLoadingIndicatorCircle } from './loading-indicator-circle';

describe('sbb-loading-indicator-circle', () => {
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
  template: `<sbb-loading-indicator-circle></sbb-loading-indicator-circle>`,
  imports: [SbbLoadingIndicatorCircle],
})
class TestComponent {}
