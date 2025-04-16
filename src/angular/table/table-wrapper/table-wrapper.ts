import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbTableWrapperElement } from '@sbb-esta/lyne-elements/table/table-wrapper.js';

import '@sbb-esta/lyne-elements/table/table-wrapper.js';

@Directive({
  selector: 'sbb-table-wrapper',
  host: {
    '[attr.tabindex]': 'focusable ? 0 : null',
    role: 'section',
  },
})
export class SbbTableWrapper {
  #element: ElementRef<SbbTableWrapperElement> = inject(ElementRef<SbbTableWrapperElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }

  /** Whether the table wrapper is focusable. */
  @Input()
  get focusable(): boolean {
    return this._focusable;
  }
  set focusable(value: BooleanInput) {
    this._focusable = coerceBooleanProperty(value);
  }
  private _focusable: boolean = true;
}
