import { Directive, ElementRef, inject, Input } from '@angular/core';

/**
 * Directive to display a badge for an element.
 *
 * Usage:
 * ```html
 * <button sbb-badge="99" sbb-badge-position="before">Label</button>
 * ```
 */
@Directive({
  selector: '[sbb-badge]',
})
export class SbbBadgeDirective {
  #elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  /**
   * The content of the badge.
   * @param value
   */
  @Input('sbb-badge')
  public set badge(value: string | null) {
    if (value) {
      this.#elementRef.nativeElement.setAttribute('sbb-badge', value);
    } else {
      this.#elementRef.nativeElement.removeAttribute('sbb-badge');
    }
  }
  public get badge(): string | null {
    return this.#elementRef.nativeElement.getAttribute('sbb-badge');
  }

  /**
   * The position of the badge.
   * @param value either before or after (default) the element.
   */
  @Input({ alias: 'sbb-badge-position' })
  public set position(value: 'before' | 'after' | null) {
    if (value) {
      this.#elementRef.nativeElement.setAttribute('sbb-badge-position', value);
    } else {
      this.#elementRef.nativeElement.removeAttribute('sbb-badge-position');
    }
  }
  public get position(): string | null {
    return this.#elementRef.nativeElement.getAttribute('sbb-badge-position');
  }
}
