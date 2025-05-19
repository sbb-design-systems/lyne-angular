import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbAccentButtonStaticElement } from '@sbb-esta/lyne-elements/button/accent-button-static.js';
import type { SbbButtonSize } from '@sbb-esta/lyne-elements/button.js';

import '@sbb-esta/lyne-elements/button/accent-button-static.js';

@Directive({
  selector: 'sbb-accent-button-static',
  exportAs: 'sbbAccentButtonStatic',
})
export class SbbAccentButtonStatic {
  #element: ElementRef<SbbAccentButtonStaticElement> = inject(
    ElementRef<SbbAccentButtonStaticElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set size(value: SbbButtonSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): SbbButtonSize {
    return this.#element.nativeElement.size;
  }

  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }

  @Input()
  public set iconName(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.iconName = value));
  }
  public get iconName(): string {
    return this.#element.nativeElement.iconName;
  }

  @Input({ transform: booleanAttribute })
  public set disabled(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disabled = value));
  }
  public get disabled(): boolean {
    return this.#element.nativeElement.disabled;
  }
}
