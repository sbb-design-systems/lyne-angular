import {
  Directive,
  ElementRef,
  inject,
  Input,
  NgZone,
  numberAttribute,
  type OutputRef,
} from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { booleanAttribute, internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type { SbbToastElement, SbbToastPosition } from '@sbb-esta/lyne-elements/toast.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/toast.js';

/**
 * It displays a toast notification.
 *
 * @slot  - Use the unnamed slot to add content to the `sbb-toast`.
 * @slot icon - Assign a custom icon via slot.
 * @slot action - Provide a custom action for this toast.
 * @cssprop [--sbb-toast-z-index=var(--sbb-overlay-default-z-index)] - To specify a custom stack order, the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`.
 */
@Directive({
  selector: 'sbb-toast',
  exportAs: 'sbbToast',
})
export class SbbToast {
  #element: ElementRef<SbbToastElement> = inject(ElementRef<SbbToastElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * The length of time in milliseconds to wait before automatically dismissing the toast.
   * If 0 (default), it stays open indefinitely.
   * From accessibility perspective, it is recommended to set a timeout of at least 20 seconds.
   */
  @Input({ transform: numberAttribute })
  public set timeout(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.timeout = value));
  }
  public get timeout(): number {
    return this.#element.nativeElement.timeout;
  }

  /**
   * The position where to place the toast.
   */
  @Input()
  public set position(value: SbbToastPosition) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.position = value));
  }
  public get position(): SbbToastPosition {
    return this.#element.nativeElement.position;
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
   * The ARIA politeness level.
   * Check https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions#live_regions for further info
   */
  @Input()
  public set politeness(value: 'polite' | 'assertive' | 'off') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.politeness = value));
  }
  public get politeness(): 'polite' | 'assertive' | 'off' {
    return this.#element.nativeElement.politeness;
  }

  /**
   * The icon name we want to use, choose from the small icon variants
   * from the ui-icons category from here
   * https://icons.app.sbb.ch.
   */
  @Input()
  public set iconName(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.iconName = value));
  }
  public get iconName(): string {
    return this.#element.nativeElement.iconName;
  }

  /**
   * Whether the element is open.
   */
  public get isOpen(): boolean {
    return this.#element.nativeElement.isOpen;
  }

  /**
   * Open the toast.
   * If there are other opened toasts in the page, close them first.
   */
  public open(): void {
    return this.#element.nativeElement.open();
  }

  /**
   * Close the toast.
   */
  public close(): void {
    return this.#element.nativeElement.close();
  }

  /**
   * Emits whenever the component starts the opening transition. Can be canceled.
   */
  public beforeOpenOutput: OutputRef<Event> = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeopen'),
    { alias: 'beforeOpen' },
  );

  protected _openOutput: OutputRef<Event> = outputFromObservable<Event>(NEVER, { alias: 'open' });
  /**
   * Emits whenever the component is opened.
   */
  public openOutput: OutputRef<Event> = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'open'),
  );

  /**
   * Emits whenever the component begins the closing transition. Can be canceled.
   */
  public beforeCloseOutput: OutputRef<Event> = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeclose'),
    { alias: 'beforeClose' },
  );

  protected _closeOutput: OutputRef<Event> = outputFromObservable<Event>(NEVER, { alias: 'close' });
  /**
   * Emits whenever the component is closed.
   */
  public closeOutput: OutputRef<Event> = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'close'),
  );

  /**
   * The method which is called on escape key press. Defaults to calling close()
   */
  public escapeStrategy(): void {
    return this.#element.nativeElement.escapeStrategy();
  }
}
