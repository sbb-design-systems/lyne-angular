import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import { SbbDividerElement } from '@sbb-esta/lyne-elements/divider.pure.js';

/**
 * Displays a divider between sections.
 */
@Directive({
  selector: 'sbb-divider',
  exportAs: 'sbbDivider',
})
export class SbbDivider {
  static {
    SbbDividerElement.define();
  }

  #element: ElementRef<SbbDividerElement> = inject(ElementRef<SbbDividerElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Orientation property with possible values 'horizontal' | 'vertical'. Defaults to horizontal.
   */
  @Input()
  public set orientation(value: 'horizontal' | 'vertical') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.orientation = value));
  }
  public get orientation(): 'horizontal' | 'vertical' {
    return this.#element.nativeElement.orientation;
  }

  /**
   * Negative coloring variant flag.
   */
  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }
}
