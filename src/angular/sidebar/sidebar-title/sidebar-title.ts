import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbHeadingLevel } from '@sbb-esta/lyne-elements/core.js';
import { SbbSidebarTitleElement } from '@sbb-esta/lyne-elements/sidebar.pure.js';

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
  static {
    SbbSidebarTitleElement.define();
  }

  #element: ElementRef<SbbSidebarTitleElement> = inject(ElementRef<SbbSidebarTitleElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Title level
   */
  @Input()
  public set level(value: SbbHeadingLevel) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.level = value));
  }
  public get level(): SbbHeadingLevel {
    return this.#element.nativeElement.level;
  }

  /**
   * Visual level for the title.
   */
  @Input()
  public set visualLevel(value: SbbHeadingLevel | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.visualLevel = value));
  }
  public get visualLevel(): SbbHeadingLevel | null {
    return this.#element.nativeElement.visualLevel;
  }
}
