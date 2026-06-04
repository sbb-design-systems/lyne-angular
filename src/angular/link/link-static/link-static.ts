import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import { SbbLinkStaticElement } from '@sbb-esta/lyne-elements/link.pure.js';

/**
 * It displays a static link enhanced with the SBB Design.
 *
 * @slot  - Use the unnamed slot to add content to the `sbb-link-static`.
 */
@Directive({
  selector: 'sbb-link-static',
  exportAs: 'sbbLinkStatic',
})
export class SbbLinkStatic {
  static {
    SbbLinkStaticElement.define();
  }

  #element: ElementRef<SbbLinkStaticElement> = inject(ElementRef<SbbLinkStaticElement>);
  #ngZone: NgZone = inject(NgZone);

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

  /**
   * Whether the component is disabled.
   */
  @Input({ transform: booleanAttribute })
  public set disabled(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disabled = value));
  }
  public get disabled(): boolean {
    return this.#element.nativeElement.disabled;
  }
}
