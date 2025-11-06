import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbNavigationSectionElement } from '@sbb-esta/lyne-elements/navigation/navigation-section.js';

import '@sbb-esta/lyne-elements/navigation/navigation-section.js';

/**
 * It can be used as a container for `sbb-navigation-list` within a `sbb-navigation`.
 *
 * @slot  - Use the unnamed slot to add content into the `sbb-navigation-section`.
 */
@Directive({
  selector: 'sbb-navigation-section',
  exportAs: 'sbbNavigationSection',
})
export class SbbNavigationSection {
  #element: ElementRef<SbbNavigationSectionElement> = inject(
    ElementRef<SbbNavigationSectionElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  /**
   * The label to be shown before the action list.
   */
  @Input()
  public set titleContent(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.titleContent = value));
  }
  public get titleContent(): string {
    return this.#element.nativeElement.titleContent;
  }

  /**
   * The element that will trigger the navigation section.
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
   * This will be forwarded as aria-label to the nav element and is read as a title of the navigation-section.
   */
  @Input()
  public set accessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accessibilityLabel = value));
  }
  public get accessibilityLabel(): string {
    return this.#element.nativeElement.accessibilityLabel;
  }

  /**
   * This will be forwarded as aria-label to the back button element.
   */
  @Input()
  public set accessibilityBackLabel(value: string) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.accessibilityBackLabel = value),
    );
  }
  public get accessibilityBackLabel(): string {
    return this.#element.nativeElement.accessibilityBackLabel;
  }

  /**
   * Opens the navigation section on trigger click.
   */
  public open(): void {
    return this.#element.nativeElement.open();
  }

  /**
   * Closes the navigation section.
   */
  public close(): void {
    return this.#element.nativeElement.close();
  }
}
