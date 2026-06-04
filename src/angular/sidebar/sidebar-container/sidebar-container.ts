import { Directive, ElementRef, inject } from '@angular/core';
import {
  SbbSidebarContainerElement,
  type SbbSidebarElement,
} from '@sbb-esta/lyne-elements/sidebar.pure.js';

/**
 * This is the parent component to one or two `<sbb-sidebar>`s that validates the state internally
 * and coordinates the backdrop and content styling.
 *
 * @slot  - Use the unnamed slot to add `sbb-sidebar` and `sbb-sidebar-content` elements.
 */
@Directive({
  selector: 'sbb-sidebar-container',
  exportAs: 'sbbSidebarContainer',
})
export class SbbSidebarContainer {
  static {
    SbbSidebarContainerElement.define();
  }

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
