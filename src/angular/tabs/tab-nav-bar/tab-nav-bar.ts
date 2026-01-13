import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbTabNavBarElement } from '@sbb-esta/lyne-elements/tabs/tab-nav-bar.js';
import '@sbb-esta/lyne-elements/tabs/tab-nav-bar.js';

/**
 * It displays one or more tab-label-like elements, each one is an anchor element.
 *
 * @slot  - Use the unnamed slot to add anchors.
 */
@Directive({
  selector: 'sbb-tab-nav-bar',
  exportAs: 'sbbTabNavBar',
})
export class SbbTabNavBar {
  #element: ElementRef<SbbTabNavBarElement> = inject(ElementRef<SbbTabNavBarElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Size variant, either s, l or xl.
   */
  @Input()
  public set size(value: 's' | 'l' | 'xl') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 's' | 'l' | 'xl' {
    return this.#element.nativeElement.size;
  }
}
