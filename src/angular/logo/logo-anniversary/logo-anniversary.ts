import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import { SbbLogoAnniversaryElement } from '@sbb-esta/lyne-elements/logo.pure.js';

/**
 * SBB 125 years anniversary logo
 * @cssprop [--sbb-logo-height=auto] - Can be used to set the height of the logo.
 * @cssprop [--sbb-logo-anniversary-initial-delay=3s] - Initial delay after which the animation starts.
 */
@Directive({
  selector: 'sbb-logo-anniversary',
  exportAs: 'sbbLogoAnniversary',
})
export class SbbLogoAnniversary {
  static {
    SbbLogoAnniversaryElement.define();
  }

  #element: ElementRef<SbbLogoAnniversaryElement> = inject(ElementRef<SbbLogoAnniversaryElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Accessibility label which will be forwarded to the SVG logo.
   */
  @Input()
  public set accessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accessibilityLabel = value));
  }
  public get accessibilityLabel(): string {
    return this.#element.nativeElement.accessibilityLabel;
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
