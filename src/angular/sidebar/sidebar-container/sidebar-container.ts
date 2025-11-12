import { Directive, ElementRef, inject } from '@angular/core';
import type { SbbSidebarContainerElement } from '@sbb-esta/lyne-elements/sidebar/sidebar-container.js';
import type { SbbSidebarElement } from '@sbb-esta/lyne-elements/sidebar/sidebar.js';

import '@sbb-esta/lyne-elements/sidebar/sidebar-container.js';

/**
 * This is the parent component to one or two `<sbb-sidebar>`s that validates the state internally
and coordinates the backdrop and content styling.
 *
 * @slot  - Use the unnamed slot to add `sbb-sidebar` and `sbb-sidebar-content` elements.
 */
@Directive({
  selector: 'sbb-sidebar-container',
  exportAs: 'sbbSidebarContainer',
})
export class SbbSidebarContainer {
  #element: ElementRef<SbbSidebarContainerElement> = inject(ElementRef<SbbSidebarContainerElement>);

  /**
   * The sidebar children.
   */
  public get sidebars(): SbbSidebarElement[] {
    return this.#element.nativeElement.sidebars;
  }

  /**
   * The sidebar child with the `start` position.
   */
  public get start(): SbbSidebarElement | null {
    return this.#element.nativeElement.start;
  }

  /**
   * The sidebar child with the `end` position.
   */
  public get end(): SbbSidebarElement | null {
    return this.#element.nativeElement.end;
  }
}
