import { Component, viewChild } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { waitForLitRender } from '@sbb-esta/lyne-elements/core/testing.js';

import { SbbPopover } from './popover';
import { SbbPopoverTrigger } from './popover-trigger';

describe('sbb-popover', () => {
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
    let fixture: ComponentFixture<TestSbbPopoverTrigger>, component: TestSbbPopoverTrigger;

    beforeEach(async () => {
      fixture = TestBed.createComponent(TestSbbPopoverTrigger);
      component = fixture.componentInstance;
      fixture.detectChanges();
      await waitForLitRender(fixture.nativeElement);
    });

    it('should create', async () => {
      expect(component).toBeDefined();
    });

    it('popover should open when correctly connected', async () => {
      expect(component.popover().isOpen).toBe(false);
      fixture.nativeElement.querySelector('sbb-secondary-button')!.click();
      expect(component.popover().isOpen).toBe(true);
    });
  });
});

@Component({
  template: `<sbb-popover></sbb-popover>`,
  imports: [SbbPopover],
})
class TestComponent {}

@Component({
  template: `
    <sbb-secondary-button [sbbPopover]="popover">Open Popover</sbb-secondary-button>
    <sbb-popover #popover="sbbPopover"></sbb-popover>
  `,
  imports: [SbbPopover, SbbPopoverTrigger, SbbButtonModule],
})
class TestSbbPopoverTrigger {
  popover = viewChild.required(SbbPopover);
}
