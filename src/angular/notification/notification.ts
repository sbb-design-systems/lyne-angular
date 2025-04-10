import { Directive, ElementRef, inject, Input, NgZone, Output } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbNotificationElement } from '@sbb-esta/lyne-elements/notification.js';
import { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';
import { fromEvent, type Observable, NEVER } from 'rxjs';
import '@sbb-esta/lyne-elements/notification.js';

@Directive({
  selector: 'sbb-notification',
})
export class SbbNotification {
  #element: ElementRef<SbbNotificationElement> = inject(ElementRef<SbbNotificationElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set type(value: 'info' | 'success' | 'warn' | 'error') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.type = value));
  }
  public get type(): 'info' | 'success' | 'warn' | 'error' {
    return this.#element.nativeElement.type;
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

  @Input({ transform: booleanAttribute })
  public set readonly(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.readonly = value));
  }
  public get readonly(): boolean {
    return this.#element.nativeElement.readonly;
  }

  @Input()
  public set size(value: 'm' | 's') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 'm' | 's' {
    return this.#element.nativeElement.size;
  }

  @Input()
  public set animation(value: 'open' | 'close' | 'all' | 'none') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.animation = value));
  }
  public get animation(): 'open' | 'close' | 'all' | 'none' {
    return this.#element.nativeElement.animation;
  }

  @Output('willOpen') protected _willOpen: (typeof this)['willOpen'] = NEVER;
  public willOpen: Observable<void> = fromEvent<void>(this.#element.nativeElement, 'willOpen');

  @Output('didOpen') protected _didOpen: (typeof this)['didOpen'] = NEVER;
  public didOpen: Observable<void> = fromEvent<void>(this.#element.nativeElement, 'didOpen');

  @Output('willClose') protected _willClose: (typeof this)['willClose'] = NEVER;
  public willClose: Observable<void> = fromEvent<void>(this.#element.nativeElement, 'willClose');

  @Output('didClose') protected _didClose: (typeof this)['didClose'] = NEVER;
  public didClose: Observable<void> = fromEvent<void>(this.#element.nativeElement, 'didClose');

  public close(): void {
    return this.#element.nativeElement.close();
  }
}
