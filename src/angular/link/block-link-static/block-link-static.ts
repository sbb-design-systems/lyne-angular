import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbBlockLinkStaticElement } from '@sbb-esta/lyne-elements/link.js';

import '@sbb-esta/lyne-elements/link.js';

/**
 * It displays a static link enhanced with the SBB Design.
 *
 * @slot  - Use the unnamed slot to add content to the `sbb-block-link-static`.
 * @slot icon - Slot used to display the icon, if one is set.
 */
@Directive({
  selector: 'sbb-block-link-static',
  exportAs: 'sbbBlockLinkStatic',
})
export class SbbBlockLinkStatic {
  #element: ElementRef<SbbBlockLinkStaticElement> = inject(ElementRef<SbbBlockLinkStaticElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }

  /**
   * Moves the icon to the end of the component if set to true.
   */
  @Input()
  public set iconPlacement(value: 'start' | 'end') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.iconPlacement = value));
  }
  public get iconPlacement(): 'start' | 'end' {
    return this.#element.nativeElement.iconPlacement;
  }

  /**
   * Size variant, either xs (lean theme default), s (standard theme default) or m.
   */
  @Input()
  public set size(value: 'xs' | 's' | 'm' | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 'xs' | 's' | 'm' | null {
    return this.#element.nativeElement.size;
  }

  /**
   * The icon name we want to use, choose from the small icon variants
   * from the ui-icons category from here
   * https://icons.app.sbb.ch.
   */
  @Input()
  public set iconName(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.iconName = value));
  }
  public get iconName(): string {
    return this.#element.nativeElement.iconName;
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
