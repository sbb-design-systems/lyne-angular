import { Component } from '@angular/core';
import { type ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import type { SbbTimeInputElement } from '@sbb-esta/lyne-elements/time-input.js';

import { SbbTimeInput } from './time-input';

describe('sbb-time-input', () => {
  let fixture: ComponentFixture<TestComponent>,
    component: TestComponent,
    lyneElement: SbbTimeInputElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
    });
  }));

  beforeEach(async () => {
    await customElements.whenDefined('sbb-time-input');
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    lyneElement = (fixture.debugElement.nativeElement as HTMLElement).querySelector(
      'sbb-time-input',
    )!;
  });

  it('should create', async () => {
    expect(lyneElement.matches(':defined')).toBeTrue();
    expect(component).toBeDefined();
  });
});

@Component({
  template: `<sbb-time-input></sbb-time-input>`,
  imports: [SbbTimeInput],
})
class TestComponent {}
