import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbMessageElement } from '@sbb-esta/lyne-elements/message.js';
import '@sbb-esta/lyne-elements/message.js';
import { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';

@Directive({
  selector: 'sbb-message',
})
export class SbbMessage {
  #element: ElementRef<SbbMessageElement> = inject(ElementRef<SbbMessageElement>);
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
