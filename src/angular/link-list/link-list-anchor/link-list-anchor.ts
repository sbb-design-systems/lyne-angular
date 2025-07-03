import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbLinkListAnchorElement } from '@sbb-esta/lyne-elements/link-list/link-list-anchor.js';
import type { SbbLinkSize } from '@sbb-esta/lyne-elements/link.js';
import type { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';

import '@sbb-esta/lyne-elements/link-list/link-list-anchor.js';

@Directive({
  selector: 'sbb-link-list-anchor',
  exportAs: 'sbbLinkListAnchor',
})
export class SbbLinkListAnchor {
  #element: ElementRef<SbbLinkListAnchorElement> = inject(ElementRef<SbbLinkListAnchorElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }

  @Input()
  public set titleContent(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.titleContent = value));
  }
  public get titleContent(): string {
    return this.#element.nativeElement.titleContent;
  }

  @Input()
  public set titleLevel(value: SbbTitleLevel) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.titleLevel = value));
  }
  public get titleLevel(): SbbTitleLevel {
    return this.#element.nativeElement.titleLevel;
  }

  @Input()
  public set size(value: SbbLinkSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): SbbLinkSize {
    return this.#element.nativeElement.size;
  }
}
