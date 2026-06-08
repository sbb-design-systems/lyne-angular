import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import { SbbTabNavBarElement } from '@sbb-esta/lyne-elements/tabs.pure.js';

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
  static {
    SbbTabNavBarElement.define();
  }

  #element: ElementRef<SbbTabNavBarElement> = inject(ElementRef<SbbTabNavBarElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Size variant, either s (lean theme default), l (standard theme default) or xl.
   */
  @Input()
  public set size(value: 's' | 'l' | 'xl' | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 's' | 'l' | 'xl' | null {
    return this.#element.nativeElement.size;
  }
}
