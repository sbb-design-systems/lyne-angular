/* eslint-disable @angular-eslint/directive-selector, @angular-eslint/directive-class-suffix */
import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbCardBadgeElement } from '@sbb-esta/lyne-elements/card/card-badge.js';
import '@sbb-esta/lyne-elements/card/card-badge.js';

@Directive({
  selector: 'sbb-card-badge',
  standalone: true,
})
export class SbbCardBadge {
  #element: ElementRef<SbbCardBadgeElement> = inject(ElementRef<SbbCardBadgeElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set color(value: 'charcoal' | 'white') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.color = value));
  }
  public get color(): 'charcoal' | 'white' {
    return this.#element.nativeElement.color;
  }
}
