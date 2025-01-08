/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbMapContainerElement } from '@sbb-esta/lyne-elements/map-container.js';
import '@sbb-esta/lyne-elements/map-container.js';

@Directive({
  selector: 'sbb-map-container',
  standalone: true,
})
export class SbbMapContainerDirective {
  #element: ElementRef<SbbMapContainerElement> = inject(ElementRef<SbbMapContainerElement>);
  #ngZone: NgZone = inject(NgZone);

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'hide-scroll-up-button', transform: booleanAttribute })
  public set hideScrollUpButton(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.hideScrollUpButton = value));
  }
  public get hideScrollUpButton(): boolean {
    return this.#element.nativeElement.hideScrollUpButton;
  }
}
