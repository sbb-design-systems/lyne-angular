import { Directive, ElementRef, inject, Input, NgZone, type OutputRef } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { booleanAttribute, internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type { SbbNotificationElement } from '@sbb-esta/lyne-elements/notification.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/notification.js';

/**
 * It displays messages which require a user's attention without interrupting its tasks.
 *
 * @slot  - Use the unnamed slot to add content to the `sbb-notification`. Content should consist of an optional `sbb-title` element and text content.
 * @slot title - Slot for the title. For the standard `sbb-title` element, the slot is automatically assigned when slotted in the unnamed slot.
 * @cssprop [--sbb-notification-margin=0] - Can be used to modify the margin in order to get a smoother animation. See style section for more information.
 */
@Directive({
  selector: 'sbb-notification',
  exportAs: 'sbbNotification',
})
export class SbbNotification {
  #element: ElementRef<SbbNotificationElement> = inject(ElementRef<SbbNotificationElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * The type of the notification.
   */
  @Input()
  public set type(value: 'info' | 'success' | 'warn' | 'error') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.type = value));
  }
  public get type(): 'info' | 'success' | 'warn' | 'error' {
    return this.#element.nativeElement.type;
  }

  /**
   * Whether the component is readonly.
   */
  @Input({ transform: booleanAttribute })
  public set readOnly(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.readOnly = value));
  }
  public get readOnly(): boolean {
    return this.#element.nativeElement.readOnly;
  }

  /**
   * Size variant, either s or m.
   */
  @Input()
  public set size(value: 'm' | 's') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 'm' | 's' {
    return this.#element.nativeElement.size;
  }

  /**
   * The enabled animations.
   */
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

  /**
   * Emits when the opening animation starts.
   */
  public beforeOpenOutput: OutputRef<Event> = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeopen'),
    { alias: 'beforeOpen' },
  );

  /**
   * Emits when the closing animation starts. Can be canceled to prevent the component from closing.
   */
  public beforeCloseOutput: OutputRef<Event> = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeclose'),
    { alias: 'beforeClose' },
  );

  protected _openOutput: OutputRef<Event> = outputFromObservable<Event>(NEVER, { alias: 'open' });
  /**
   * Emits when the opening animation ends.
   */
  public openOutput: OutputRef<Event> = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'open'),
  );

  protected _closeOutput: OutputRef<Event> = outputFromObservable<Event>(NEVER, { alias: 'close' });
  /**
   * Emits when the closing animation ends.
   */
  public closeOutput: OutputRef<Event> = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'close'),
  );
}
