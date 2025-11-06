import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbSidebarTitleElement } from '@sbb-esta/lyne-elements/sidebar/sidebar-title.js';
import type { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';

import '@sbb-esta/lyne-elements/sidebar/sidebar-title.js';

/**
 * It displays the title of the sidebar. It has to be placed inside an `sbb-sidebar` element.
 *
 * @slot  - Use the unnamed slot for the content of the sidebar-title.
 */
@Directive({
  selector: 'sbb-sidebar-title',
  exportAs: 'sbbSidebarTitle',
})
export class SbbSidebarTitle {
  #element: ElementRef<SbbSidebarTitleElement> = inject(ElementRef<SbbSidebarTitleElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Title level
   */
  @Input()
  public set level(value: SbbTitleLevel) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.level = value));
  }
  public get level(): SbbTitleLevel {
    return this.#element.nativeElement.level;
  }

  /**
   * Visual level for the title.
   */
  @Input()
  public set visualLevel(value: SbbTitleLevel | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.visualLevel = value));
  }
  public get visualLevel(): SbbTitleLevel | null {
    return this.#element.nativeElement.visualLevel;
  }
}
