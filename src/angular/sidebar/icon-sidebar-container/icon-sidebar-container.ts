import { Directive, ElementRef, inject } from '@angular/core';
import type { SbbIconSidebarContainerElement } from '@sbb-esta/lyne-elements/sidebar/icon-sidebar-container.js';
import type { SbbIconSidebarElement } from '@sbb-esta/lyne-elements/sidebar/icon-sidebar.js';

import '@sbb-esta/lyne-elements/sidebar/icon-sidebar-container.js';

@Directive({
  selector: 'sbb-icon-sidebar-container',
  exportAs: 'sbbIconSidebarContainer',
})
export class SbbIconSidebarContainer {
  #element: ElementRef<SbbIconSidebarContainerElement> = inject(
    ElementRef<SbbIconSidebarContainerElement>,
  );

  public get sidebars(): SbbIconSidebarElement[] {
    return this.#element.nativeElement.sidebars;
  }

  public get start(): SbbIconSidebarElement | null {
    return this.#element.nativeElement.start;
  }

  public get end(): SbbIconSidebarElement | null {
    return this.#element.nativeElement.end;
  }
}
