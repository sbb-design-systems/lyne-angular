/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbOptgroupBaseElement } from '@sbb-esta/lyne-elements/option/optgroup.js';
import '@sbb-esta/lyne-elements/option/optgroup.js';

@Directive({
  selector: 'sbb-opt-group',
  standalone: true,
})
export class SbbOptGroupDirective {
  #element: ElementRef<SbbOptgroupBaseElement> = inject(ElementRef<SbbOptgroupBaseElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set label(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.label = value));
  }
  public get label(): string {
    return this.#element.nativeElement.label;
  }

  @Input({ transform: booleanAttribute })
  public set disabled(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disabled = value));
  }
  public get disabled(): boolean {
    return this.#element.nativeElement.disabled;
  }
}
