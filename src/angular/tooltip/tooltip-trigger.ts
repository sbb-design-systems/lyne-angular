import {
  booleanAttribute,
  Directive,
  ElementRef,
  inject,
  Input,
  numberAttribute,
} from '@angular/core';
import { SbbTriggerBase } from '@sbb-esta/lyne-angular/core';
import { SbbTooltipElement } from '@sbb-esta/lyne-elements/tooltip.pure.js';

import { SbbTooltip } from './tooltip';

@Directive({
  selector: '[sbb-tooltip],[sbbTooltip]',
  exportAs: 'sbbTooltipTrigger',
})
export class SbbTooltipTrigger extends SbbTriggerBase<SbbTooltip> {
  static {
    SbbTooltipElement.define();
  }

  #elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  /**
   * The text for an inline tooltip or a reference to an explicit `SbbTooltip` instance.
   * Set to `null` to remove the tooltip assignment.
   */
  @Input('sbbTooltip')
  public set tooltip(value: string | SbbTooltip | null) {
    if (value instanceof SbbTooltip) {
      this.referenceElement = value;
      this.#elementRef.nativeElement.removeAttribute('sbb-tooltip');
      this.#applyOptions();
    } else {
      this.referenceElement = null;
      this.#assignAttribute('sbb-tooltip', value);
    }
  }
  public get tooltip(): string | SbbTooltip | null {
    if (this.referenceElement) {
      return this.referenceElement;
    }
    return this.#elementRef.nativeElement.getAttribute('sbb-tooltip');
  }

  /**
   * @internal
   */
  @Input('sbb-tooltip')
  set tooltipAlias(value: string | null | SbbTooltip) {
    this.tooltip = value;
  }

  /**
   * The delay in milliseconds before the tooltip opens in response to a trigger interaction.
   */
  @Input({ alias: 'sbb-tooltip-open-delay', transform: numberAttribute })
  public set openDelay(value: number | null) {
    this.#assignNumberAttribute('sbb-tooltip-open-delay', value);
    if (this.referenceElement) {
      this.referenceElement.openDelay = value;
    }
  }
  public get openDelay(): number {
    return this.referenceElement
      ? this.referenceElement.openDelay
      : Number(this.#elementRef.nativeElement.getAttribute('sbb-tooltip-open-delay'));
  }

  /**
   * The delay in milliseconds before the tooltip closes in response to a trigger interaction.
   */
  @Input({ alias: 'sbb-tooltip-close-delay', transform: numberAttribute })
  public set closeDelay(value: number | null) {
    this.#assignNumberAttribute('sbb-tooltip-close-delay', value);
    if (this.referenceElement) {
      this.referenceElement.closeDelay = value;
    }
  }
  public get closeDelay(): number {
    return this.referenceElement
      ? this.referenceElement.closeDelay
      : Number(this.#elementRef.nativeElement.getAttribute('sbb-tooltip-close-delay'));
  }

  /**
   * The preferred tooltip position followed by fallback positions, as a comma-separated
   * list or an array.
   */
  @Input({ alias: 'sbb-tooltip-position' })
  public set position(value: string | string[] | null) {
    this.#assignAttribute('sbb-tooltip-position', Array.isArray(value) ? value.join(', ') : value);

    if (this.referenceElement) {
      this.referenceElement.positions = value;
    }
  }
  public get position(): string | string[] | null {
    return this.referenceElement
      ? this.referenceElement.positions
      : this.#elementRef.nativeElement.getAttribute('sbb-tooltip-position');
  }

  /** Whether the tooltip is prevented from opening. */
  @Input({ alias: 'sbb-tooltip-disabled', transform: booleanAttribute })
  public set disabled(value: boolean) {
    this.#elementRef.nativeElement.toggleAttribute('sbb-tooltip-disabled', value);
    if (this.referenceElement) {
      this.referenceElement.disabled = value;
    }
  }
  public get disabled(): boolean {
    return this.referenceElement
      ? this.referenceElement.disabled
      : this.#elementRef.nativeElement.hasAttribute('sbb-tooltip-disabled');
  }

  #assignAttribute(name: string, value: string | null): void {
    if (value) {
      this.#elementRef.nativeElement.setAttribute(name, value);
    } else {
      this.#elementRef.nativeElement.removeAttribute(name);
    }
  }

  #assignNumberAttribute(name: string, value: number | null): void {
    if (value !== null && !isNaN(value) && value >= 0) {
      this.#elementRef.nativeElement.setAttribute(name, String(value));
    } else {
      this.#elementRef.nativeElement.removeAttribute(name);
    }
  }

  #applyOptions(): void {
    if (!this.referenceElement) {
      return;
    }
    const element = this.#elementRef.nativeElement;
    if (element.hasAttribute('sbb-tooltip-open-delay')) {
      this.referenceElement.openDelay = numberAttribute(
        element.getAttribute('sbb-tooltip-open-delay'),
      );
    }
    if (element.hasAttribute('sbb-tooltip-close-delay')) {
      this.referenceElement.closeDelay = numberAttribute(
        element.getAttribute('sbb-tooltip-close-delay'),
      );
    }
    if (element.hasAttribute('sbb-tooltip-position')) {
      this.referenceElement.positions = element.getAttribute('sbb-tooltip-position');
    }
    if (element.hasAttribute('sbb-tooltip-disabled')) {
      this.referenceElement.disabled = true;
    }
  }
}
