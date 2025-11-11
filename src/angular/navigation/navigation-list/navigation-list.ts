import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbNavigationListElement } from '@sbb-esta/lyne-elements/navigation/navigation-list.js';

import '@sbb-esta/lyne-elements/navigation/navigation-list.js';

/**
 * It can be used as a container for one or more `sbb-navigation-button`/`sbb-navigation-link` within a `sbb-navigation-section`.
 *
 * @slot  - Use the unnamed slot to add content to the `sbb-navigation-list`.
 * @slot label - Use this to provide a label element.
 */
@Directive({
  selector: 'sbb-navigation-list',
  exportAs: 'sbbNavigationList',
})
export class SbbNavigationList {
  #element: ElementRef<SbbNavigationListElement> = inject(ElementRef<SbbNavigationListElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * The label to be shown before the action list.
   */
  @Input()
  public set label(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.label = value));
  }
  public get label(): string {
    return this.#element.nativeElement.label;
  }
}
