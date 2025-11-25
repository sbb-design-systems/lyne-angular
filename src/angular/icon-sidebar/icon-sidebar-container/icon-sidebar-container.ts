import { Directive, ElementRef, inject } from '@angular/core';
import type { SbbIconSidebarContainerElement } from '@sbb-esta/lyne-elements/icon-sidebar/icon-sidebar-container.js';
import type { SbbIconSidebarElement } from '@sbb-esta/lyne-elements/icon-sidebar/icon-sidebar.js';

import '@sbb-esta/lyne-elements/icon-sidebar/icon-sidebar-container.js';

/**
 * This is the parent component to one or two `<sbb-icon-sidebar>`s and one `<sbb-icon-sidebar-content>` element.
 *
 * @slot  - Use the unnamed slot to add `sbb-sidebar` and `sbb-sidebar-content` elements.
 */
@Directive({
  selector: 'sbb-icon-sidebar-container',
  exportAs: 'sbbIconSidebarContainer',
})
export class SbbIconSidebarContainer {
  #element: ElementRef<SbbIconSidebarContainerElement> = inject(
    ElementRef<SbbIconSidebarContainerElement>,
  );

  /**
   * The icon-sidebar children.
   */
  public get sidebars(): SbbIconSidebarElement[] {
    return this.#element.nativeElement.sidebars;
  }

  /**
   * The icon-sidebar child at the start position.
   */
  public get start(): SbbIconSidebarElement | null {
    return this.#element.nativeElement.start;
  }

  /**
   * The icon-sidebar child at the end position.
   */
  public get end(): SbbIconSidebarElement | null {
    return this.#element.nativeElement.end;
  }
}
