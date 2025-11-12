import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbAccentButtonStaticElement } from '@sbb-esta/lyne-elements/button/accent-button-static.js';
import type { SbbButtonSize } from '@sbb-esta/lyne-elements/button.js';

import '@sbb-esta/lyne-elements/button/accent-button-static.js';

/**
 * It displays a static button enhanced with the SBB Design in the 'accent' variant.
 *
 * @slot  - Use the unnamed slot to add content to the accent-button-static.
 * @slot icon - Slot used to display the icon, if one is set.
 * @cssprop [--sbb-button-loading-delay=300ms] - The delay before the loading animation starts, when setting the button into loading state.
 */
@Directive({
  selector: 'sbb-accent-button-static',
  exportAs: 'sbbAccentButtonStatic',
})
export class SbbAccentButtonStatic {
  #element: ElementRef<SbbAccentButtonStaticElement> = inject(
    ElementRef<SbbAccentButtonStaticElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  /**
   * Size variant, either l, m or s.
   */
  @Input()
  public set size(value: SbbButtonSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): SbbButtonSize {
    return this.#element.nativeElement.size;
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

  /**
   * Whether the button indicates a loading state.
   * The animation kicks in after a delay of 300ms, configurable with --sbb-button-loading-delay CSS variable.
   */
  @Input({ transform: booleanAttribute })
  public set loading(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.loading = value));
  }
  public get loading(): boolean {
    return this.#element.nativeElement.loading;
  }
}
