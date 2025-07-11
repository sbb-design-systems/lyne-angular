import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbLoadingIndicatorElement } from '@sbb-esta/lyne-elements/loading-indicator.js';

import '@sbb-esta/lyne-elements/loading-indicator.js';

@Directive({
  selector: 'sbb-loading-indicator',
  exportAs: 'sbbLoadingIndicator',
})
export class SbbLoadingIndicator {
  #element: ElementRef<SbbLoadingIndicatorElement> = inject(ElementRef<SbbLoadingIndicatorElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set size(value: 's' | 'l' | 'xl' | 'xxl' | 'xxxl') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 's' | 'l' | 'xl' | 'xxl' | 'xxxl' {
    return this.#element.nativeElement.size;
  }

  @Input()
  public set color(value: 'default' | 'smoke' | 'white') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.color = value));
  }
  public get color(): 'default' | 'smoke' | 'white' {
    return this.#element.nativeElement.color;
  }
}
