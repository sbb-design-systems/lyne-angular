import { Component } from '@angular/core';
import { type ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import type { SbbStickyBarElement } from '@sbb-esta/lyne-elements/container/sticky-bar.js';

import { SbbStickyBar } from './sticky-bar';

describe('sbb-sticky-bar', () => {
  let fixture: ComponentFixture<TestComponent>,
    component: TestComponent,
    lyneElement: SbbStickyBarElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
    });
  }));

  beforeEach(async () => {
    await customElements.whenDefined('sbb-sticky-bar');
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    lyneElement = (fixture.debugElement.nativeElement as HTMLElement).querySelector(
      'sbb-sticky-bar',
    )!;
  });

  it('should create', async () => {
    expect(lyneElement.matches(':defined')).toBeTrue();
    expect(component).toBeDefined();
  });
});

@Component({
  template: `<sbb-sticky-bar></sbb-sticky-bar>`,
  imports: [SbbStickyBar],
})
class TestComponent {}
