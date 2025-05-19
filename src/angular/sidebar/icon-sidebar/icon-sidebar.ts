import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbIconSidebarContainerElement } from '@sbb-esta/lyne-elements/sidebar/icon-sidebar-container.js';
import type { SbbIconSidebarElement } from '@sbb-esta/lyne-elements/sidebar/icon-sidebar.js';

import '@sbb-esta/lyne-elements/sidebar/icon-sidebar.js';

@Directive({
  selector: 'sbb-icon-sidebar',
  exportAs: 'sbbIconSidebar',
})
export class SbbIconSidebar {
  #element: ElementRef<SbbIconSidebarElement> = inject(ElementRef<SbbIconSidebarElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set color(value: 'white' | 'milk') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.color = value));
  }
  public get color(): 'white' | 'milk' {
    return this.#element.nativeElement.color;
  }

  public get container(): SbbIconSidebarContainerElement | null {
    return this.#element.nativeElement.container;
  }
}
