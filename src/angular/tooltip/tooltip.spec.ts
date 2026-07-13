import { Component, signal, viewChild } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { waitForLitRender } from '@sbb-esta/lyne-elements/core/testing.js';
import { userEvent } from 'vitest/browser';

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

    it('tooltip should open when trigger receives focus', async () => {
      expect(component.tooltip().isOpen).toBe(false);
      fixture.nativeElement.querySelector('sbb-secondary-button')!.focus();
      await userEvent.tab();
      expect(component.tooltip().isOpen).toBe(true);
    });

    it('tooltip getter returns the connected SbbTooltip instance', () => {
      expect(component.trigger().tooltip).toBe(component.tooltip());
    });

    it('should set sbb-tooltip-open-delay attribute on the trigger element', () => {
      component.trigger().openDelay = 300;
      expect(triggerEl(fixture).getAttribute('sbb-tooltip-open-delay')).toBe('300');
    });

    it('should read back openDelay from attribute', () => {
      component.trigger().openDelay = 300;
      expect(component.trigger().openDelay).toBe(300);
    });

    it('should remove sbb-tooltip-open-delay attribute when set to null', () => {
      component.trigger().openDelay = 300;
      component.trigger().openDelay = null;
      expect(triggerEl(fixture).hasAttribute('sbb-tooltip-open-delay')).toBe(false);
    });

    it('should set sbb-tooltip-close-delay attribute on the trigger element', () => {
      component.trigger().closeDelay = 500;
      expect(triggerEl(fixture).getAttribute('sbb-tooltip-close-delay')).toBe('500');
    });

    it('should read back closeDelay from attribute', () => {
      component.trigger().closeDelay = 500;
      expect(component.trigger().closeDelay).toBe(500);
    });

    it('should remove sbb-tooltip-close-delay attribute when set to null', () => {
      component.trigger().closeDelay = 500;
      component.trigger().closeDelay = null;
      expect(triggerEl(fixture).hasAttribute('sbb-tooltip-close-delay')).toBe(false);
    });

    it('should set sbb-tooltip-position attribute on the trigger element', () => {
      component.trigger().position = 'block-start';
      expect(triggerEl(fixture).getAttribute('sbb-tooltip-position')).toBe('block-start');
    });

    it('should read back position from attribute', () => {
      component.trigger().position = 'block-start';
      expect(component.trigger().position).toBe('block-start');
    });

    it('should remove sbb-tooltip-position attribute when set to null', () => {
      component.trigger().position = 'block-start';
      component.trigger().position = null;
      expect(triggerEl(fixture).hasAttribute('sbb-tooltip-position')).toBe(false);
    });
  });

  describe('dynamic tooltip assignment', () => {
    let fixture: ComponentFixture<TestSbbTooltipDynamicTrigger>,
      component: TestSbbTooltipDynamicTrigger;

    beforeEach(async () => {
      fixture = TestBed.createComponent(TestSbbTooltipDynamicTrigger);
      component = fixture.componentInstance;
      fixture.detectChanges();
      await waitForLitRender(fixture.nativeElement);
    });

    it('should switch from SbbTooltip instance to string', () => {
      // Start with SbbTooltip component reference
      component.tooltipValue.set(component.tooltipRef());
      fixture.detectChanges();
      expect(component.trigger().tooltip).toBe(component.tooltipRef());
      expect(
        fixture.nativeElement.querySelector('sbb-secondary-button')!.hasAttribute('sbb-tooltip'),
      ).toBe(false);

      // Switch to string
      component.tooltipValue.set('Inline tooltip');
      fixture.detectChanges();
      expect(component.trigger().tooltip).toBe('Inline tooltip');
      expect(
        fixture.nativeElement.querySelector('sbb-secondary-button')!.getAttribute('sbb-tooltip'),
      ).toBe('Inline tooltip');
    });

    it('should switch from string to SbbTooltip instance', () => {
      // Start with string
      component.tooltipValue.set('Inline tooltip');
      fixture.detectChanges();
      expect(component.trigger().tooltip).toBe('Inline tooltip');
      expect(
        fixture.nativeElement.querySelector('sbb-secondary-button')!.hasAttribute('sbb-tooltip'),
      ).toBe(true);

      // Switch to SbbTooltip component reference
      component.tooltipValue.set(component.tooltipRef());
      fixture.detectChanges();
      expect(component.trigger().tooltip).toBe(component.tooltipRef());
      expect(
        fixture.nativeElement.querySelector('sbb-secondary-button')!.hasAttribute('sbb-tooltip'),
      ).toBe(false);
    });

    it('should clear the SbbTooltip reference when switching to string', () => {
      component.tooltipValue.set(component.tooltipRef());
      fixture.detectChanges();
      // Trigger is set on the tooltip's native element
      expect(component.tooltipRef().trigger).toBeTruthy();

      component.tooltipValue.set('Inline tooltip');
      fixture.detectChanges();
      // referenceElement is cleared
      expect(component.trigger().tooltip).toBe('Inline tooltip');
    });

    it('should switch to null from SbbTooltip instance', () => {
      component.tooltipValue.set(component.tooltipRef());
      fixture.detectChanges();
      expect(component.trigger().tooltip).toBe(component.tooltipRef());

      component.tooltipValue.set(null);
      fixture.detectChanges();
      expect(component.trigger().tooltip).toBeNull();
    });

    it('should switch to null from string', () => {
      component.tooltipValue.set('Inline tooltip');
      fixture.detectChanges();
      expect(component.trigger().tooltip).toBe('Inline tooltip');

      component.tooltipValue.set(null);
      fixture.detectChanges();
      expect(component.trigger().tooltip).toBeNull();
      expect(
        fixture.nativeElement.querySelector('sbb-secondary-button')!.hasAttribute('sbb-tooltip'),
      ).toBe(false);
    });
  });

  describe('string tooltip syntax', () => {
    let fixture: ComponentFixture<TestSbbTooltipStringTrigger>,
      component: TestSbbTooltipStringTrigger;

    beforeEach(async () => {
      fixture = TestBed.createComponent(TestSbbTooltipStringTrigger);
      component = fixture.componentInstance;
      fixture.detectChanges();
      await waitForLitRender(fixture.nativeElement);
    });

    it('should create', async () => {
      expect(component).toBeDefined();
    });

    it('should set sbb-tooltip attribute on the host element', () => {
      expect(
        fixture.nativeElement.querySelector('sbb-secondary-button')!.getAttribute('sbb-tooltip'),
      ).toBe('Tooltip message');
    });

    it('tooltip getter returns the string value', () => {
      expect(component.trigger().tooltip).toBe('Tooltip message');
    });

    it('should update sbb-tooltip attribute when value changes', () => {
      component.tooltipText.set('Updated tooltip');
      fixture.detectChanges();
      expect(
        fixture.nativeElement.querySelector('sbb-secondary-button')!.getAttribute('sbb-tooltip'),
      ).toBe('Updated tooltip');
    });

    it('should remove sbb-tooltip attribute when set to null', () => {
      component.tooltipText.set(null);
      fixture.detectChanges();
      expect(
        fixture.nativeElement.querySelector('sbb-secondary-button')!.hasAttribute('sbb-tooltip'),
      ).toBe(false);
    });

    it('tooltip getter returns null when attribute is removed', () => {
      component.tooltipText.set(null);
      fixture.detectChanges();
      expect(component.trigger().tooltip).toBeNull();
    });
  });
});

/** Returns the trigger button element (second sbb-secondary-button) */
function triggerEl(fixture: ComponentFixture<TestSbbTooltipTrigger>): Element {
  return fixture.nativeElement.querySelectorAll('sbb-secondary-button')[1];
}

@Component({
  template: `<sbb-tooltip></sbb-tooltip>`,
  imports: [SbbTooltip],
})
class TestComponent {}

@Component({
  template: `
    <sbb-secondary-button>Initial focus</sbb-secondary-button>
    <sbb-secondary-button [sbbTooltip]="tooltip">Trigger</sbb-secondary-button>
    <sbb-tooltip #tooltip="sbbTooltip">Tooltip content</sbb-tooltip>
  `,
  imports: [SbbTooltip, SbbTooltipTrigger, SbbButtonModule],
})
class TestSbbTooltipTrigger {
  tooltip = viewChild.required(SbbTooltip);
  trigger = viewChild.required(SbbTooltipTrigger);
}

@Component({
  template: ` <sbb-secondary-button [sbbTooltip]="tooltipText()">Button</sbb-secondary-button> `,
  imports: [SbbTooltipTrigger, SbbButtonModule],
})
class TestSbbTooltipStringTrigger {
  tooltipText = signal<string | null>('Tooltip message');
  trigger = viewChild.required(SbbTooltipTrigger);
}

@Component({
  template: `
    <sbb-secondary-button [sbbTooltip]="tooltipValue()">Trigger</sbb-secondary-button>
    <sbb-tooltip #tooltipRef="sbbTooltip">Tooltip content</sbb-tooltip>
  `,
  imports: [SbbTooltip, SbbTooltipTrigger, SbbButtonModule],
})
class TestSbbTooltipDynamicTrigger {
  tooltipRef = viewChild.required(SbbTooltip);
  trigger = viewChild.required(SbbTooltipTrigger);
  tooltipValue = signal<string | SbbTooltip | null>(null);
}
