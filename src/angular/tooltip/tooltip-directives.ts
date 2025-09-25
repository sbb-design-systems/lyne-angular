import { Directive, ElementRef, inject, Input } from '@angular/core';

@Directive({
  selector: '[sbb-tooltip]',
})
export class SbbTooltipDirective {
  #elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  @Input('sbb-tooltip')
  public set tooltip(value: string | null) {
    if (value) {
      this.#elementRef.nativeElement.setAttribute('sbb-tooltip', value);
    } else {
      this.#elementRef.nativeElement.removeAttribute('sbb-tooltip');
    }
  }
  public get tooltip(): string | null {
    return this.#elementRef.nativeElement.getAttribute('sbb-tooltip');
  }

  @Input('sbb-tooltip-open-delay')
  public set openDelay(value: number | null) {
    if (value) {
      this.#elementRef.nativeElement.setAttribute('sbb-tooltip-open-delay', String(value));
    } else {
      this.#elementRef.nativeElement.removeAttribute('sbb-tooltip-open-delay');
    }
  }
  public get openDelay(): number {
    return Number(this.#elementRef.nativeElement.getAttribute('sbb-tooltip-open-delay'));
  }

  @Input('sbb-tooltip-close-delay')
  public set closeDelay(value: number | null) {
    if (value) {
      this.#elementRef.nativeElement.setAttribute('sbb-tooltip-close-delay', String(value));
    } else {
      this.#elementRef.nativeElement.removeAttribute('sbb-tooltip-close-delay');
    }
  }
  public get closeDelay(): number {
    return Number(this.#elementRef.nativeElement.getAttribute('sbb-tooltip-close-delay'));
  }
}
