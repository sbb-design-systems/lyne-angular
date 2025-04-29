import { Component } from '@angular/core';
import { type ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import type { SbbTransparentButtonStaticElement } from '@sbb-esta/lyne-elements/button/transparent-button-static.js';

import { SbbTransparentButtonStatic } from './transparent-button-static';

describe('sbb-transparent-button-static', () => {
  let fixture: ComponentFixture<TestComponent>,
    component: TestComponent,
    lyneElement: SbbTransparentButtonStaticElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
    });
  }));

  beforeEach(async () => {
    await customElements.whenDefined('sbb-transparent-button-static');
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    lyneElement = (fixture.debugElement.nativeElement as HTMLElement).querySelector(
      'sbb-transparent-button-static',
    )!;
  });

  it('should create', async () => {
    expect(lyneElement.matches(':defined')).toBeTrue();
    expect(component).toBeDefined();
  });
});

@Component({
  template: `<sbb-transparent-button-static></sbb-transparent-button-static>`,
  imports: [SbbTransparentButtonStatic],
})
class TestComponent {}
