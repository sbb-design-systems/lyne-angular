import { Directive, Input, ElementRef, inject, numberAttribute } from '@angular/core';
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

  @Input('sbbTooltip')
  public set tooltip(value: string | SbbTooltip | null) {
    if (value instanceof SbbTooltip) {
      this.referenceElement = value;
      this.#elementRef.nativeElement.removeAttribute('sbb-tooltip');
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

  @Input({ alias: 'sbb-tooltip-open-delay', transform: numberAttribute })
  public set openDelay(value: number | null) {
    this.#assignNumberAttribute('sbb-tooltip-open-delay', value);
  }
  public get openDelay(): number {
    return Number(this.#elementRef.nativeElement.getAttribute('sbb-tooltip-open-delay'));
  }

  @Input({ alias: 'sbb-tooltip-close-delay', transform: numberAttribute })
  public set closeDelay(value: number | null) {
    this.#assignNumberAttribute('sbb-tooltip-close-delay', value);
  }
  public get closeDelay(): number {
    return Number(this.#elementRef.nativeElement.getAttribute('sbb-tooltip-close-delay'));
  }

  @Input({ alias: 'sbb-tooltip-position' })
  public set position(value: string | null) {
    this.#assignAttribute('sbb-tooltip-position', value);
  }
  public get position(): string | null {
    return this.#elementRef.nativeElement.getAttribute('sbb-tooltip-position');
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
}
