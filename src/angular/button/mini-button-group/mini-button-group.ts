/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type {
  SbbMiniButtonGroupElement,
  SbbMiniButtonGroupSize,
} from '@sbb-esta/lyne-elements/button/mini-button-group.js';
import '@sbb-esta/lyne-elements/button/mini-button-group.js';

@Directive({
  selector: 'sbb-mini-button-group',
  standalone: true,
})
export class SbbMiniButtonGroupDirective {
  #element: ElementRef<SbbMiniButtonGroupElement> = inject(ElementRef<SbbMiniButtonGroupElement>);
  #ngZone: NgZone = inject(NgZone);

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'accessibility-label' })
  public set accessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accessibilityLabel = value));
  }
  public get accessibilityLabel(): string {
    return this.#element.nativeElement.accessibilityLabel;
  }

  @Input()
  public set size(value: SbbMiniButtonGroupSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): SbbMiniButtonGroupSize {
    return this.#element.nativeElement.size;
  }

  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }
}
