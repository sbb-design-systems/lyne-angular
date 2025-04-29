import { Component } from '@angular/core';
import { type ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import type { SbbLoadingIndicatorCircleElement } from '@sbb-esta/lyne-elements/loading-indicator-circle.js';

import { SbbLoadingIndicatorCircle } from './loading-indicator-circle';

describe('sbb-loading-indicator-circle', () => {
  let fixture: ComponentFixture<TestComponent>,
    component: TestComponent,
    lyneElement: SbbLoadingIndicatorCircleElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
    });
  }));

  beforeEach(async () => {
    await customElements.whenDefined('sbb-loading-indicator-circle');
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    lyneElement = (fixture.debugElement.nativeElement as HTMLElement).querySelector(
      'sbb-loading-indicator-circle',
    )!;
  });

  it('should create', async () => {
    expect(lyneElement.matches(':defined')).toBeTrue();
    expect(component).toBeDefined();
  });
});

@Component({
  template: `<sbb-loading-indicator-circle></sbb-loading-indicator-circle>`,
  imports: [SbbLoadingIndicatorCircle],
})
class TestComponent {}
