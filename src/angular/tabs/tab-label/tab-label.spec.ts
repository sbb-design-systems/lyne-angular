import { Component } from '@angular/core';
import { type ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SbbTabLabel } from './tab-label';

describe('sbb-tab-label', () => {
  let fixture: ComponentFixture<TestComponent>, component: TestComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
    });
  }));

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
  template: `<sbb-tab-label></sbb-tab-label>`,
  imports: [SbbTabLabel],
})
class TestComponent {}
