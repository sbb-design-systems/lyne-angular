import { Component } from '@angular/core';
import { type ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import type { SbbPearlChainVerticalElement } from '@sbb-esta/lyne-elements-experimental/pearl-chain-vertical.js';

import { SbbPearlChainVertical } from './pearl-chain-vertical';

describe('sbb-pearl-chain-vertical', () => {
  let fixture: ComponentFixture<TestComponent>,
    component: TestComponent,
    lyneElement: SbbPearlChainVerticalElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
    });
  }));

  beforeEach(async () => {
    await customElements.whenDefined('sbb-pearl-chain-vertical');
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    lyneElement = (fixture.debugElement.nativeElement as HTMLElement).querySelector(
      'sbb-pearl-chain-vertical',
    )!;
  });

  it('should create', async () => {
    expect(lyneElement.matches(':defined')).toBeTrue();
    expect(component).toBeDefined();
  });
});

@Component({
  template: `<sbb-pearl-chain-vertical></sbb-pearl-chain-vertical>`,
  imports: [SbbPearlChainVertical],
})
class TestComponent {}
