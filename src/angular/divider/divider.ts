import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import { SbbOrientation } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type { SbbDividerElement } from '@sbb-esta/lyne-elements/divider.js';
import '@sbb-esta/lyne-elements/divider.js';

@Directive({
  selector: 'sbb-divider',
  standalone: true,
})
export class SbbDivider {
  #element: ElementRef<SbbDividerElement> = inject(ElementRef<SbbDividerElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set orientation(value: SbbOrientation) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.orientation = value));
  }
  public get orientation(): SbbOrientation {
    return this.#element.nativeElement.orientation;
  }

  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }
}
