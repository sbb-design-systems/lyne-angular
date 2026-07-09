import { Component, viewChild } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { waitForLitRender } from '@sbb-esta/lyne-elements/core/testing.js';

import { SbbTooltip } from './tooltip';
import { SbbTooltipTrigger } from './tooltip-trigger';

describe('sbb-tooltip', () => {
  describe('basic usage', () => {
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

  describe('standalone usage with trigger', () => {
    let fixture: ComponentFixture<TestSbbTooltipTrigger>, component: TestSbbTooltipTrigger;

    beforeEach(async () => {
      fixture = TestBed.createComponent(TestSbbTooltipTrigger);
      component = fixture.componentInstance;
      fixture.detectChanges();
      await waitForLitRender(fixture.nativeElement);
    });

    it('should create', async () => {
      expect(component).toBeDefined();
    });

    it('tooltip should open when correctly connected', async () => {
      expect(component.tooltip().isOpen).toBe(false);
      fixture.nativeElement.querySelector('sbb-secondary-button')!.click();
      expect(component.tooltip().isOpen).toBe(true);
    });
  });
});

@Component({
  template: `<sbb-tooltip></sbb-tooltip>`,
  imports: [SbbTooltip],
})
class TestComponent {}

@Component({
  template: `
    <sbb-secondary-button [sbbTooltipTrigger]="tooltip">Trigger</sbb-secondary-button>
    <sbb-tooltip #tooltip="sbbTooltip">Tooltip content</sbb-tooltip>
  `,
  imports: [SbbTooltip, SbbTooltipTrigger, SbbButtonModule],
})
class TestSbbTooltipTrigger {
  tooltip = viewChild.required(SbbTooltip);
}
