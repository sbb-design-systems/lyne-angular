import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbIconSidebarContainerElement } from '@sbb-esta/lyne-elements/sidebar/icon-sidebar-container.js';
import type { SbbIconSidebarElement } from '@sbb-esta/lyne-elements/sidebar/icon-sidebar.js';

import '@sbb-esta/lyne-elements/sidebar/icon-sidebar.js';

/**
 * Icon sidebar, can be placed inside a `sbb-icon-sidebar-container` element.
 *
 * @slot  - Use the unnamed slot to slot any content into the icon-sidebar.
 */
@Directive({
  selector: 'sbb-icon-sidebar',
  exportAs: 'sbbIconSidebar',
})
export class SbbIconSidebar {
  #element: ElementRef<SbbIconSidebarElement> = inject(ElementRef<SbbIconSidebarElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Background color of the icon sidebar. Either `white` or `milk`. *
   */
  @Input()
  public set color(value: 'white' | 'milk') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.color = value));
  }
  public get color(): 'white' | 'milk' {
    return this.#element.nativeElement.color;
  }

  /**
   * Returns the SbbIconSidebarContainerElement where this icon-sidebar is contained.
   */
  public get container(): SbbIconSidebarContainerElement | null {
    return this.#element.nativeElement.container;
  }
}
