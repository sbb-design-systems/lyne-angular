/* eslint-disable @angular-eslint/directive-selector, @angular-eslint/directive-class-suffix */
import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbSkiplinkListElement } from '@sbb-esta/lyne-elements/skiplink-list.js';
import '@sbb-esta/lyne-elements/skiplink-list.js';
import { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';

@Directive({
  selector: 'sbb-skiplink-list',
  standalone: true,
})
export class SbbSkiplinkList {
  #element: ElementRef<SbbSkiplinkListElement> = inject(ElementRef<SbbSkiplinkListElement>);
  #ngZone: NgZone = inject(NgZone);

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'title-content' })
  public set titleContent(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.titleContent = value));
  }
  public get titleContent(): string {
    return this.#element.nativeElement.titleContent;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'title-level' })
  public set titleLevel(value: SbbTitleLevel) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.titleLevel = value));
  }
  public get titleLevel(): SbbTitleLevel {
    return this.#element.nativeElement.titleLevel;
  }
}
