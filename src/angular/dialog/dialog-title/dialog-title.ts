import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbDialogTitleElement } from '@sbb-esta/lyne-elements/dialog/dialog-title.js';
import type { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';

import '@sbb-esta/lyne-elements/dialog/dialog-title.js';

/**
 * It displays a title inside a dialog header.
 *
 * @slot  - Use the unnamed slot for the content of the dialog-title.
 */
@Directive({
  selector: 'sbb-dialog-title',
  exportAs: 'sbbDialogTitle',
})
export class SbbDialogTitle {
  #element: ElementRef<SbbDialogTitleElement> = inject(ElementRef<SbbDialogTitleElement>);
  #ngZone: NgZone = inject(NgZone);

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
   * Visual level for the title.
   */
  @Input()
  public set visualLevel(value: SbbTitleLevel | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.visualLevel = value));
  }
  public get visualLevel(): SbbTitleLevel | null {
    return this.#element.nativeElement.visualLevel;
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
