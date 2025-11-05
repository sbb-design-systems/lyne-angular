import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbLinkListAnchorElement } from '@sbb-esta/lyne-elements/link-list/link-list-anchor.js';
import type { SbbLinkSize } from '@sbb-esta/lyne-elements/link.js';
import type { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';

import '@sbb-esta/lyne-elements/link-list/link-list-anchor.js';

/**
 * It displays a list of `sbb-block-link`.
 *
 * @slot  - Use the unnamed slot to add one or more `sbb-block-link`.
 * @slot title - Use this slot to provide a title.
 */
@Directive({
  selector: 'sbb-link-list-anchor',
  exportAs: 'sbbLinkListAnchor',
})
export class SbbLinkListAnchor {
  #element: ElementRef<SbbLinkListAnchorElement> = inject(ElementRef<SbbLinkListAnchorElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Negative coloring variant flag.
   */
  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }

  /**
   * The title text we want to show before the list.
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

  /**
   * Text size of the nested sbb-block-link instances.
   * This will overwrite the size attribute of nested sbb-block-link instances.
   */
  @Input()
  public set size(value: SbbLinkSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): SbbLinkSize {
    return this.#element.nativeElement.size;
  }
}
