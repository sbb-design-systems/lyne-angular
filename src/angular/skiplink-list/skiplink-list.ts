import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbSkiplinkListElement } from '@sbb-esta/lyne-elements/skiplink-list.js';
import type { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';

import '@sbb-esta/lyne-elements/skiplink-list.js';

/**
 * It displays a list of `sbb-block-link`/`sbb-block-link-button` which are visible only when focused.
 *
 * @slot  - Use the unnamed slot to add `sbb-block-link`/`sbb-block-link-button` elements to the `sbb-skiplink-list`.
 * @slot title - Use this to provide a title for the skiplink-list (optional).
 * @cssprop [--sbb-skiplink-list-z-index=var(--sbb-overlay-default-z-index)] - To specify a custom stack order, the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`.
 */
@Directive({
  selector: 'sbb-skiplink-list',
  exportAs: 'sbbSkiplinkList',
})
export class SbbSkiplinkList {
  #element: ElementRef<SbbSkiplinkListElement> = inject(ElementRef<SbbSkiplinkListElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * The title text we want to place before the list.
   */
  @Input()
  public set titleContent(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.titleContent = value));
  }
  public get titleContent(): string {
    return this.#element.nativeElement.titleContent;
  }

  /**
   * The semantic level of the title, e.g. 2 = h2.
   */
  @Input()
  public set titleLevel(value: SbbTitleLevel) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.titleLevel = value));
  }
  public get titleLevel(): SbbTitleLevel {
    return this.#element.nativeElement.titleLevel;
  }
}
