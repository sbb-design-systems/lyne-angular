import { Component } from '@angular/core';
import { type ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import type { SbbPearlChainVerticalItemElement } from '@sbb-esta/lyne-elements-experimental/pearl-chain-vertical-item.js';

import { SbbPearlChainVerticalItem } from './pearl-chain-vertical-item';

describe('sbb-pearl-chain-vertical-item', () => {
  let fixture: ComponentFixture<TestComponent>,
    component: TestComponent,
    lyneElement: SbbPearlChainVerticalItemElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
    });
  }));

  beforeEach(async () => {
    await customElements.whenDefined('sbb-pearl-chain-vertical-item');
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    lyneElement = (fixture.debugElement.nativeElement as HTMLElement).querySelector(
      'sbb-pearl-chain-vertical-item',
    )!;
  });

  it('should create', async () => {
    expect(lyneElement.matches(':defined')).toBeTrue();
    expect(component).toBeDefined();
  });
});

@Component({
  template: `<sbb-pearl-chain-vertical-item></sbb-pearl-chain-vertical-item>`,
  imports: [SbbPearlChainVerticalItem],
})
class TestComponent {}
