import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type { SbbNavigationElement } from '@sbb-esta/lyne-elements/navigation/navigation.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/navigation/navigation.js';

/**
 * It displays a navigation menu, wrapping one or more `sbb-navigation-*` components.
 *
 * @slot  - Use the unnamed slot to add `sbb-navigation-button`/`sbb-navigation-link` elements into the sbb-navigation menu.
 * @cssprop [--sbb-navigation-z-index=var(--sbb-overlay-default-z-index)] - To specify a custom stack order, the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`.
 */
@Directive({
  selector: 'sbb-navigation',
  exportAs: 'sbbNavigation',
})
export class SbbNavigation {
  #element: ElementRef<SbbNavigationElement> = inject(ElementRef<SbbNavigationElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * The element that will trigger the navigation.
   *
   * For attribute usage, provide an id reference.
   */
  @Input()
  public set trigger(value: string | HTMLElement | null) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.trigger = value as HTMLElement | null),
    );
  }
  public get trigger(): HTMLElement | null {
    return this.#element.nativeElement.trigger;
  }

  /**
   * This will be forwarded as aria-label to the close button element.
   */
  @Input()
  public set accessibilityCloseLabel(value: string) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.accessibilityCloseLabel = value),
    );
  }
  public get accessibilityCloseLabel(): string {
    return this.#element.nativeElement.accessibilityCloseLabel;
  }

  /**
   * Returns the active navigation section element.
   */
  public get activeNavigationSection(): HTMLElement | null {
    return this.#element.nativeElement.activeNavigationSection;
  }

  /**
   * Whether the element is open.
   */
  public get isOpen(): boolean {
    return this.#element.nativeElement.isOpen;
  }

  /**
   * Opens the navigation.
   */
  public open(): void {
    return this.#element.nativeElement.open();
  }

  /**
   * Closes the navigation.
   */
  public close(): void {
    return this.#element.nativeElement.close();
  }

  /**
   * Returns the close button element.
   */
  public get closeButton(): HTMLElement | null {
    return this.#element.nativeElement.closeButton;
  }

  /**
   * Returns the navigation content element.
   */
  public get navigationContent(): HTMLElement | null {
    return this.#element.nativeElement.navigationContent;
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
