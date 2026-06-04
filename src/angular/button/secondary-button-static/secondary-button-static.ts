import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import { SbbSecondaryButtonStaticElement } from '@sbb-esta/lyne-elements/button.pure.js';

/**
 * It displays a static button enhanced with the SBB Design in the 'secondary' variant.
 *
 * @slot  - Use the unnamed slot to add content to the secondary-button-static.
 * @slot icon - Slot used to display the icon, if one is set.
 * @cssprop [--sbb-button-loading-delay=300ms] - The delay before the loading animation starts, when setting the button into loading state.
 */
@Directive({
  selector: 'sbb-secondary-button-static',
  exportAs: 'sbbSecondaryButtonStatic',
})
export class SbbSecondaryButtonStatic {
  static {
    SbbSecondaryButtonStaticElement.define();
  }

  #element: ElementRef<SbbSecondaryButtonStaticElement> = inject(
    ElementRef<SbbSecondaryButtonStaticElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  /**
   * Size variant, either s (lean theme default), m (standard theme default) or l.
   */
  @Input()
  public set size(value: 's' | 'm' | 'l' | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 's' | 'm' | 'l' | null {
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
