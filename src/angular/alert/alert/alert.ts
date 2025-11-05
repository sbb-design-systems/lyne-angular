import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { booleanAttribute, internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type { SbbAlertElement } from '@sbb-esta/lyne-elements/alert/alert.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/alert/alert.js';

/**
 * It displays messages which require user's attention.
 *
 * @slot  - Use the unnamed slot to add content to the `sbb-alert`. At a minimum an `sbb-title` element and a descriptive text should be used.
 * @slot icon - Should be a `sbb-icon` which is displayed next to the title. Styling is optimized for icons of type HIM-CUS.
 * @slot title - Slot for the title. For the standard `sbb-title` element, the slot is automatically assigned when slotted in the unnamed slot.
 */
@Directive({
  selector: 'sbb-alert',
  exportAs: 'sbbAlert',
})
export class SbbAlert {
  #element: ElementRef<SbbAlertElement> = inject(ElementRef<SbbAlertElement>);
  #ngZone: NgZone = inject(NgZone);

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
   * You can choose between `s`, `m` or `l` size.
   */
  @Input()
  public set size(value: 's' | 'm' | 'l') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 's' | 'm' | 'l' {
    return this.#element.nativeElement.size;
  }

  /**
   * Name of the icon which will be forward to the nested `sbb-icon`.
   * Choose the icons from https://icons.app.sbb.ch.
   * Styling is optimized for icons of type HIM-CUS.
   */
  @Input()
  public set iconName(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.iconName = value));
  }
  public get iconName(): string {
    return this.#element.nativeElement.iconName;
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

  /**
   * Whether the element is open.
   */
  public get isOpen(): boolean {
    return this.#element.nativeElement.isOpen;
  }

  /**
   * Open the alert.
   */
  public open(): void {
    return this.#element.nativeElement.open();
  }

  /**
   * Close the alert.
   */
  public close(): void {
    return this.#element.nativeElement.close();
  }

  /**
   * Emits whenever the component starts the opening transition. Can be canceled.
   */
  public beforeOpenOutput = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeopen'),
    { alias: 'beforeOpen' },
  );

  protected _openOutput = outputFromObservable<Event>(NEVER, { alias: 'open' });
  /**
   * Emits whenever the component is opened.
   */
  public openOutput = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'open'),
  );

  /**
   * Emits whenever the component begins the closing transition. Can be canceled.
   */
  public beforeCloseOutput = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeclose'),
    { alias: 'beforeClose' },
  );

  protected _closeOutput = outputFromObservable<Event>(NEVER, { alias: 'close' });
  /**
   * Emits whenever the component is closed.
   */
  public closeOutput = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'close'),
  );

  /**
   * The method which is called on escape key press. Defaults to calling close()
   */
  public escapeStrategy(): void {
    return this.#element.nativeElement.escapeStrategy();
  }
}
