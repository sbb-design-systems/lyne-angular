import { Directive, ElementRef, inject } from '@angular/core';
import type { SbbSidebarContainerElement } from '@sbb-esta/lyne-elements/sidebar/sidebar-container.js';
import type { SbbSidebarElement } from '@sbb-esta/lyne-elements/sidebar/sidebar.js';

import '@sbb-esta/lyne-elements/sidebar/sidebar-container.js';

@Directive({
  selector: 'sbb-sidebar-container',
  exportAs: 'sbbSidebarContainer',
})
export class SbbSidebarContainer {
  #element: ElementRef<SbbSidebarContainerElement> = inject(ElementRef<SbbSidebarContainerElement>);

  public get sidebars(): SbbSidebarElement[] {
    return this.#element.nativeElement.sidebars;
  }

  public get start(): SbbSidebarElement | null {
    return this.#element.nativeElement.start;
  }

  public get end(): SbbSidebarElement | null {
    return this.#element.nativeElement.end;
  }
}
