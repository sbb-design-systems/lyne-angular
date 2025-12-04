import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbTitleElement, SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';

import '@sbb-esta/lyne-elements/title.js';

/**
 *
 *
 * @slot  - Use the unnamed slot for the content of the title.
 * @cssprop [--sbb-title-margin-block=undefined] - Margin block of the title.
 */
@Directive({
  selector: 'sbb-title',
  exportAs: 'sbbTitle',
})
export class SbbTitle {
  #element: ElementRef<SbbTitleElement> = inject(ElementRef<SbbTitleElement>);
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
   * Title level
   */
  @Input()
  public set level(value: SbbTitleLevel) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.level = value));
  }
  public get level(): SbbTitleLevel {
    return this.#element.nativeElement.level;
  }

  /**
   * Visual level for the title. Optional, if not set, the value of level will be used.
   */
  @Input()
  public set visualLevel(value: SbbTitleLevel | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.visualLevel = value));
  }
  public get visualLevel(): SbbTitleLevel | null {
    return this.#element.nativeElement.visualLevel;
  }
}
