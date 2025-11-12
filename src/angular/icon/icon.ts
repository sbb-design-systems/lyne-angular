import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbIconElement } from '@sbb-esta/lyne-elements/icon.js';

import '@sbb-esta/lyne-elements/icon.js';

/**
 * Displays an icon loaded from a registered namespace.
 * @cssprop [--sbb-icon-svg-width=auto] - Can be used to set a custom width.
 * @cssprop [--sbb-icon-svg-height=auto] - Can be used to set a custom height.
 */
@Directive({
  selector: 'sbb-icon',
  exportAs: 'sbbIcon',
})
export class SbbIcon {
  #element: ElementRef<SbbIconElement> = inject(ElementRef<SbbIconElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * The provided name consisting of the namespace and the name of the icon.
   * If the namespace is missing, the default namespace "sbb" will be used.
   * E.g. `name` (will use "sbb" as namespace) or `namespace:name`.
   */
  @Input()
  public set name(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.name = value));
  }
  public get name(): string {
    return this.#element.nativeElement.name;
  }

  /**
   * When set to `true`, SVG content that is HTTP fetched will not be checked
   * if the response SVG content has any `<script>` elements, or any attributes
   * that start with `on`, such as `onclick`.
   */
  @Input({ transform: booleanAttribute })
  public set noSanitize(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.noSanitize = value));
  }
  public get noSanitize(): boolean {
    return this.#element.nativeElement.noSanitize;
  }
}
