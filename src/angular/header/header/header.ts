import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbHeaderElement } from '@sbb-esta/lyne-elements/header/header.js';

import '@sbb-esta/lyne-elements/header/header.js';

/**
 * It displays a header section for the page.
 *
 * @slot  - Use the unnamed slot to add actions, content and logo to the header.
 * @cssprop [--sbb-header-z-index=10] - Can be used to modify the z-index of the header.
 * @cssprop [--sbb-header-height=zero-small:var(--sbb-spacing-fixed-14x);medium-ultra:var(--sbb-spacing-fixed-24x)] - Can be used to modify height of the header.
 */
@Directive({
  selector: 'sbb-header',
  exportAs: 'sbbHeader',
})
export class SbbHeader {
  #element: ElementRef<SbbHeaderElement> = inject(ElementRef<SbbHeaderElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Whether to allow the header content to stretch to full width.
   * By default, the content has the appropriate page size.
   */
  @Input({ transform: booleanAttribute })
  public set expanded(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.expanded = value));
  }
  public get expanded(): boolean {
    return this.#element.nativeElement.expanded;
  }

  /**
   * The element's id or the element on which the scroll listener is attached.
   *
   * For attribute usage, provide an id reference.
   */
  @Input()
  public set scrollOrigin(value: string | HTMLElement | null) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.scrollOrigin = value as HTMLElement | null),
    );
  }
  public get scrollOrigin(): HTMLElement | null {
    return this.#element.nativeElement.scrollOrigin;
  }

  /**
   * Whether the header should hide and show on scroll.
   */
  @Input({ transform: booleanAttribute })
  public set hideOnScroll(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.hideOnScroll = value));
  }
  public get hideOnScroll(): boolean {
    return this.#element.nativeElement.hideOnScroll;
  }

  /**
   * Size of the header, either m or s.
   */
  @Input()
  public set size(value: 'm' | 's') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 'm' | 's' {
    return this.#element.nativeElement.size;
  }
}
