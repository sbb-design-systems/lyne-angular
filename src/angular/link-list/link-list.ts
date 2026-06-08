import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbHorizontalFrom, SbbHeadingLevel } from '@sbb-esta/lyne-elements/core.js';
import { SbbLinkListElement } from '@sbb-esta/lyne-elements/link-list.pure.js';

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
  static {
    SbbLinkListElement.define();
  }

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
  public set orientation(value: 'horizontal' | 'vertical') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.orientation = value));
  }
  public get orientation(): 'horizontal' | 'vertical' {
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
  public set titleLevel(value: SbbHeadingLevel) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.titleLevel = value));
  }
  public get titleLevel(): SbbHeadingLevel {
    return this.#element.nativeElement.titleLevel;
  }

  /**
   * Text size of the nested sbb-block-link instances, either xs (lean theme default), s (standard theme default) or m
   * This will overwrite the size attribute of nested sbb-block-link instances.
   */
  @Input()
  public set size(value: 'xs' | 's' | 'm' | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 'xs' | 's' | 'm' | null {
    return this.#element.nativeElement.size;
  }
}
