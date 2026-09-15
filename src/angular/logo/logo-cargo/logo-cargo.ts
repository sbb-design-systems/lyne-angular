import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import { SbbLogoCargoElement } from '@sbb-esta/lyne-elements/logo.pure.js';

/**
 * It displays the SBB Cargo logo.
 * @cssprop [--sbb-logo-height=auto] - Can be used to set the height of the logo.
 */
@Directive({
  selector: 'sbb-logo-cargo',
  exportAs: 'sbbLogoCargo',
})
export class SbbLogoCargo {
  static {
    SbbLogoCargoElement.define();
  }

  #element: ElementRef<SbbLogoCargoElement> = inject(ElementRef<SbbLogoCargoElement>);
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
   * Visual protective room around logo.
   */
  @Input()
  public set protectiveRoom(value: 'none' | 'minimal' | 'ideal') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.protectiveRoom = value));
  }
  public get protectiveRoom(): 'none' | 'minimal' | 'ideal' {
    return this.#element.nativeElement.protectiveRoom;
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
