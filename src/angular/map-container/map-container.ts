import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbMapContainerElement } from '@sbb-esta/lyne-elements/map-container.js';

import '@sbb-esta/lyne-elements/map-container.js';

/**
 * It can be used as a container for maps.
 *
 * @slot  - Use the unnamed slot to add content to the sidebar.
 * @slot map - Used for slotting the map.
 * @cssprop [--sbb-map-container-margin-start=var(--sbb-header-height)] - The component comes along with a height calculation that subtracts the height of the header. For specific use cases, this variable can be used to modify the preset height.
 * @cssprop [--sbb-map-container-sidebar-width=zero-large:400px;wide-ultra:480px] - Can be used to modify the width of the left sidebar.
 * @cssprop [--sbb-map-container-mobile-sticky-block-start=0] - If e.g. a header with a fixed height is placed before the map-container, the map should be sticky respecting this offset from the document's top. Only applied on mobile views. Most commonly it can be set to `var(--sbb-header-height)`.
 */
@Directive({
  selector: 'sbb-map-container',
  exportAs: 'sbbMapContainer',
})
export class SbbMapContainer {
  #element: ElementRef<SbbMapContainerElement> = inject(ElementRef<SbbMapContainerElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Flag to show/hide the scroll up button inside the sidebar on mobile.
   */
  @Input({ transform: booleanAttribute })
  public set hideScrollUpButton(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.hideScrollUpButton = value));
  }
  public get hideScrollUpButton(): boolean {
    return this.#element.nativeElement.hideScrollUpButton;
  }
}
