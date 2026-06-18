import { Directive, ElementRef, inject, Input, numberAttribute } from '@angular/core';
import { SbbTooltipElement } from '@sbb-esta/lyne-elements/tooltip.pure.js';

@Directive({
  selector: '[sbb-tooltip]',
})
export class SbbTooltipDirective {
  static {
    SbbTooltipElement.define();
  }

  #elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  @Input('sbb-tooltip')
  public set tooltip(value: string | null) {
    this.#assignAttribute('sbb-tooltip', value);
  }
  public get tooltip(): string | null {
    return this.#elementRef.nativeElement.getAttribute('sbb-tooltip');
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
