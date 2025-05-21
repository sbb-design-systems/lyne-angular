import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbCheckboxSize } from '@sbb-esta/lyne-elements/checkbox.js';
import type { SbbVisualCheckboxElement } from '@sbb-esta/lyne-elements/visual-checkbox.js';
import '@sbb-esta/lyne-elements/visual-checkbox.js';

@Directive({
  selector: 'sbb-visual-checkbox',
  exportAs: 'sbbVisualCheckbox',
})
export class SbbVisualCheckbox {
  #element: ElementRef<SbbVisualCheckboxElement> = inject(ElementRef<SbbVisualCheckboxElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set checked(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.checked = value));
  }
  public get checked(): boolean {
    return this.#element.nativeElement.checked;
  }

  @Input({ transform: booleanAttribute })
  public set indeterminate(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.indeterminate = value));
  }
  public get indeterminate(): boolean {
    return this.#element.nativeElement.indeterminate;
  }

  @Input()
  public set size(value: SbbCheckboxSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): SbbCheckboxSize {
    return this.#element.nativeElement.size;
  }

  @Input({ transform: booleanAttribute })
  public set disabled(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disabled = value));
  }
  public get disabled(): boolean {
    return this.#element.nativeElement.disabled;
  }

  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }
}
