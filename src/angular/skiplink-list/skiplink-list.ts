import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbSkiplinkListElement } from '@sbb-esta/lyne-elements/skiplink-list.js';
import '@sbb-esta/lyne-elements/skiplink-list.js';
import type { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';

@Directive({
  selector: 'sbb-skiplink-list',
  exportAs: 'sbbSkiplinkList',
})
export class SbbSkiplinkList {
  #element: ElementRef<SbbSkiplinkListElement> = inject(ElementRef<SbbSkiplinkListElement>);
  #ngZone: NgZone = inject(NgZone);

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
}
