import { Directive, ElementRef, inject, Input, NgZone, type OutputRef } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { booleanAttribute, internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type { SbbNotificationElement } from '@sbb-esta/lyne-elements/notification.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/notification.js';

@Directive({
  selector: 'sbb-notification',
  exportAs: 'sbbNotification',
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

  @Input({ transform: booleanAttribute })
  public set readOnly(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.readOnly = value));
  }
  public get readOnly(): boolean {
    return this.#element.nativeElement.readOnly;
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

  public close(): void {
    return this.#element.nativeElement.close();
  }

  public beforeOpenOutput: OutputRef<Event> = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeopen'),
    { alias: 'beforeOpen' },
  );

  public beforeCloseOutput: OutputRef<Event> = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeclose'),
    { alias: 'beforeClose' },
  );

  protected _openOutput: OutputRef<Event> = outputFromObservable<Event>(NEVER, { alias: 'open' });
  public openOutput: OutputRef<Event> = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'open'),
  );

  protected _closeOutput: OutputRef<Event> = outputFromObservable<Event>(NEVER, { alias: 'close' });
  public closeOutput: OutputRef<Event> = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'close'),
  );
}
