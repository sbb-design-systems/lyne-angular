import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbHorizontalFrom, SbbOrientation } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type { SbbLinkListElement } from '@sbb-esta/lyne-elements/link-list/link-list.js';
import type { SbbLinkSize } from '@sbb-esta/lyne-elements/link.js';
import type { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';

import '@sbb-esta/lyne-elements/link-list/link-list.js';

/**
 * It displays a list of `sbb-block-link`.
 *
 * @slot  - Use the unnamed slot to add one or more `sbb-block-link`.
 * @slot title - Use this slot to provide a title.
 */
@Directive({
  selector: 'sbb-link-list',
  exportAs: 'sbbLinkList',
})
export class SbbLinkList {
  #element: ElementRef<SbbLinkListElement> = inject(ElementRef<SbbLinkListElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Selected breakpoint from which the list is rendered horizontally.
   */
  @Input()
  public set horizontalFrom(value: SbbHorizontalFrom | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.horizontalFrom = value));
  }
  public get horizontalFrom(): SbbHorizontalFrom | null {
    return this.#element.nativeElement.horizontalFrom;
  }

  /**
   * The orientation in which the list will be shown vertical or horizontal.
   */
  @Input()
  public set orientation(value: SbbOrientation) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.orientation = value));
  }
  public get orientation(): SbbOrientation {
    return this.#element.nativeElement.orientation;
  }

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
