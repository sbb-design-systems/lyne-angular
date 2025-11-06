import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbContainerElement } from '@sbb-esta/lyne-elements/container/container.js';

import '@sbb-esta/lyne-elements/container/container.js';

/**
 * It displays its content with the default page spacing.
 *
 * @slot  - Use the unnamed slot to add anything to the container.
 * @slot sticky-bar - The slot used by the sbb-sticky-bar component.
 * @slot image - The slot used to slot an `sbb-image` to use as background.
 */
@Directive({
  selector: 'sbb-container',
  exportAs: 'sbbContainer',
})
export class SbbContainer {
  #element: ElementRef<SbbContainerElement> = inject(ElementRef<SbbContainerElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Whether the container is expanded.
   */
  @Input({ transform: booleanAttribute })
  public set expanded(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.expanded = value));
  }
  public get expanded(): boolean {
    return this.#element.nativeElement.expanded;
  }

  /**
   * Whether the background color is shown on full container width on large screens.
   */
  @Input({ transform: booleanAttribute })
  public set backgroundExpanded(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.backgroundExpanded = value));
  }
  public get backgroundExpanded(): boolean {
    return this.#element.nativeElement.backgroundExpanded;
  }

  /**
   * Color of the container, like transparent, white etc.
   */
  @Input()
  public set color(value: 'transparent' | 'white' | 'milk' | 'midnight' | 'charcoal') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.color = value));
  }
  public get color(): 'transparent' | 'white' | 'milk' | 'midnight' | 'charcoal' {
    return this.#element.nativeElement.color;
  }
}
