import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbNavigationButtonElement, SbbNavigationLinkElement , SbbNavigationMarkerElement  } from '@sbb-esta/lyne-elements/navigation.js';

import '@sbb-esta/lyne-elements/navigation.js';

/**
 * It can be used as a container for one or more `sbb-navigation-button`/`sbb-navigation-link` within a `sbb-navigation`.
 *
 * @slot  - Use the unnamed slot to add `sbb-navigation-button`/`sbb-navigation-link` elements into the `sbb-navigation-marker`.
 */
@Directive({
  selector: 'sbb-navigation-marker',
  exportAs: 'sbbNavigationMarker',
})
export class SbbNavigationMarker {
  #element: ElementRef<SbbNavigationMarkerElement> = inject(ElementRef<SbbNavigationMarkerElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Marker size variant, either s or l.
   */
  @Input()
  public set size(value: 'l' | 's') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 'l' | 's' {
    return this.#element.nativeElement.size;
  }

  public select(action: SbbNavigationButtonElement | SbbNavigationLinkElement): void {
    return this.#element.nativeElement.select(action);
  }

  public reset(): void {
    return this.#element.nativeElement.reset();
  }
}
