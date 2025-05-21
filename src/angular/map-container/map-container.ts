import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbMapContainerElement } from '@sbb-esta/lyne-elements/map-container.js';
import '@sbb-esta/lyne-elements/map-container.js';

@Directive({
  selector: 'sbb-map-container',
  exportAs: 'sbbMapContainer',
})
export class SbbMapContainer {
  #element: ElementRef<SbbMapContainerElement> = inject(ElementRef<SbbMapContainerElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set hideScrollUpButton(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.hideScrollUpButton = value));
  }
  public get hideScrollUpButton(): boolean {
    return this.#element.nativeElement.hideScrollUpButton;
  }
}
