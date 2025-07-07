import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbLoadingIndicatorCircleElement } from '@sbb-esta/lyne-elements/loading-indicator-circle.js';

import '@sbb-esta/lyne-elements/loading-indicator-circle.js';

@Directive({
  selector: 'sbb-loading-indicator-circle',
  exportAs: 'sbbLoadingIndicatorCircle',
})
export class SbbLoadingIndicatorCircle {
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
