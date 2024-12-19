/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbLoadingIndicatorCircleElement } from '@sbb-esta/lyne-elements/loading-indicator-circle.js';
import '@sbb-esta/lyne-elements/loading-indicator-circle.js';

@Directive({
  selector: 'sbb-loading-indicator-circle',
  standalone: true,
})
export class SbbLoadingIndicatorCircleDirective {
  #element: ElementRef<SbbLoadingIndicatorCircleElement> = inject(
    ElementRef<SbbLoadingIndicatorCircleElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set color(value: 'default' | 'smoke' | 'white') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.color = value));
  }
  public get color(): 'default' | 'smoke' | 'white' {
    return this.#element.nativeElement.color;
  }
}
