import { Component, signal, viewChild } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { waitForLitRender } from '@sbb-esta/lyne-elements/core/testing.js';
import type { SbbTooltipElement } from '@sbb-esta/lyne-elements/tooltip.pure.js';
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
      expect(component.tooltip().openDelay).toBe(300);
    });

    it('should read back openDelay from attribute', () => {
      component.trigger().openDelay = 300;
      expect(component.trigger().openDelay).toBe(300);
    });

    it('should remove sbb-tooltip-open-delay attribute when set to null', () => {
      component.trigger().openDelay = 300;
      component.trigger().openDelay = null;
      expect(triggerEl(fixture).hasAttribute('sbb-tooltip-open-delay')).toBe(false);
      expect(component.tooltip().openDelay).toBe(0);
    });

    it('should set sbb-tooltip-close-delay attribute on the trigger element', () => {
      component.trigger().closeDelay = 500;
      expect(triggerEl(fixture).getAttribute('sbb-tooltip-close-delay')).toBe('500');
      expect(component.tooltip().closeDelay).toBe(500);
    });

    it('should read back closeDelay from attribute', () => {
      component.trigger().closeDelay = 500;
      expect(component.trigger().closeDelay).toBe(500);
    });

    it('should remove sbb-tooltip-close-delay attribute when set to null', () => {
      component.trigger().closeDelay = 500;
      component.trigger().closeDelay = null;
      expect(triggerEl(fixture).hasAttribute('sbb-tooltip-close-delay')).toBe(false);
      expect(component.tooltip().closeDelay).toBe(0);
    });

    it('should set sbb-tooltip-positions attribute on the trigger element', () => {
      component.trigger().positions = 'block-start';
      expect(triggerEl(fixture).getAttribute('sbb-tooltip-positions')).toBe('block-start');
      expect(component.tooltip().positions).toEqual(['block-start']);
    });

    it('should read back positions from attribute', () => {
      component.trigger().positions = 'block-start';
      expect(component.trigger().positions).toBe('block-start');
    });

    it('should remove sbb-tooltip-positions attribute when set to null', () => {
      component.trigger().positions = 'block-start';
      component.trigger().positions = null;
      expect(triggerEl(fixture).hasAttribute('sbb-tooltip-positions')).toBe(false);
      expect(component.tooltip().positions).toEqual([]);
    });

    it('should disable the referenced tooltip when the trigger is disabled', () => {
      component.trigger().disabled = true;
      expect(triggerEl(fixture)).toHaveAttribute('sbb-tooltip-disabled');
      expect(component.tooltip().disabled).toBe(true);
      component.tooltip().open();
      expect(component.tooltip().isOpen).toBe(false);

      component.trigger().disabled = false;
      expect(triggerEl(fixture)).not.toHaveAttribute('sbb-tooltip-disabled');
      expect(component.tooltip().disabled).toBe(false);
    });

    it('should open the referenced tooltip again after re-enabling it', () => {
      component.trigger().disabled = true;
      component.tooltip().open();
      expect(component.tooltip().isOpen).toBe(false);

      component.trigger().disabled = false;
      component.tooltip().open();
      expect(component.tooltip().isOpen).toBe(true);
    });

    it('should forward position array and comma-separated positions to the tooltip', () => {
      component.trigger().positions = ['block-start', 'inline-end'];
      expect(triggerEl(fixture).getAttribute('sbb-tooltip-positions')).toBe(
        'block-start, inline-end',
      );
      expect(component.trigger().positions).toEqual(['block-start', 'inline-end']);
      expect(component.tooltip().positions).toEqual(['block-start', 'inline-end']);

      component.trigger().positions = 'block-end, inline-start';
      expect(component.tooltip().positions).toEqual(['block-end', 'inline-start']);
    });

    it('should read values changed directly on the referenced tooltip', () => {
      component.tooltip().openDelay = 125;
      component.tooltip().closeDelay = 250;
      component.tooltip().positions = ['inline-end'];
      component.tooltip().disabled = true;

      expect(component.trigger().openDelay).toBe(125);
      expect(component.trigger().closeDelay).toBe(250);
      expect(component.trigger().positions).toEqual(['inline-end']);
      expect(component.trigger().disabled).toBe(true);
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

    it('applies trigger options when the tooltip reference is assigned later', () => {
      component.trigger().openDelay = 300;
      component.trigger().closeDelay = 500;
      component.trigger().positions = 'block-start';
      component.trigger().disabled = true;

      component.tooltipValue.set(component.tooltipRef());
      fixture.detectChanges();

      expect(component.tooltipRef().openDelay).toBe(300);
      expect(component.tooltipRef().closeDelay).toBe(500);
      expect(component.tooltipRef().disabled).toBe(true);
      expect(component.tooltipRef().positions).toEqual(['block-start']);
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

  describe('trigger input bindings', () => {
    it('coerces and forwards bound options to the referenced tooltip', async () => {
      const fixture = TestBed.createComponent(TestSbbTooltipBindings);
      fixture.detectChanges();
      await waitForLitRender(fixture.nativeElement);

      const component = fixture.componentInstance;
      expect(component.tooltip().openDelay).toBe(100);
      expect(component.tooltip().closeDelay).toBe(200);
      expect(component.tooltip().positions).toEqual(['block-start', 'inline-end']);
      expect(component.tooltip().disabled).toBe(true);

      component.openDelay.set('0');
      component.closeDelay.set('0');
      component.positions.set(['block-end', 'inline-start']);
      component.disabled.set('false');
      fixture.detectChanges();

      expect(component.tooltip().openDelay).toBe(0);
      expect(component.tooltip().closeDelay).toBe(0);
      expect(component.tooltip().positions).toEqual(['block-end', 'inline-start']);
      expect(component.tooltip().disabled).toBe(false);
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

    it('forwards trigger options to the inline tooltip and updates them', async () => {
      const trigger = fixture.nativeElement.querySelector('sbb-secondary-button')!;
      component.trigger().openDelay = 120;
      component.trigger().closeDelay = 250;
      component.trigger().positions = ['block-end', 'inline-start'];
      component.trigger().disabled = true;

      await vi.waitFor(() => {
        const tooltip = Array.from(
          document.querySelectorAll<SbbTooltipElement>('sbb-tooltip'),
        ).find((element) => element.trigger === trigger);
        expect(tooltip).toBeDefined();
        expect(tooltip!.openDelay).toBe(120);
        expect(tooltip!.closeDelay).toBe(250);
        expect(tooltip!.positions).toEqual(['block-end', 'inline-start']);
        expect(tooltip!.disabled).toBe(true);
      });

      component.trigger().disabled = false;
      component.trigger().positions = null;
      await vi.waitFor(() => {
        const tooltip = Array.from(
          document.querySelectorAll<SbbTooltipElement>('sbb-tooltip'),
        ).find((element) => element.trigger === trigger)!;
        expect(tooltip.disabled).toBe(false);
        expect(tooltip.positions).toEqual([]);
      });
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
  template: `
    <sbb-secondary-button
      [sbbTooltip]="tooltip"
      [sbb-tooltip-open-delay]="openDelay()"
      [sbb-tooltip-close-delay]="closeDelay()"
      [sbb-tooltip-positions]="positions()"
      [sbb-tooltip-disabled]="disabled()"
    >
      Trigger
    </sbb-secondary-button>
    <sbb-tooltip #tooltip="sbbTooltip">Tooltip content</sbb-tooltip>
  `,
  imports: [SbbTooltip, SbbTooltipTrigger, SbbButtonModule],
})
class TestSbbTooltipBindings {
  openDelay = signal('100');
  closeDelay = signal('200');
  positions = signal<string | string[]>('block-start, inline-end');
  disabled = signal<string | boolean>('');
  tooltip = viewChild.required(SbbTooltip);
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
