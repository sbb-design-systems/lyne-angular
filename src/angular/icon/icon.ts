/* eslint-disable @angular-eslint/directive-selector, @angular-eslint/directive-class-suffix */
import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbIconElement } from '@sbb-esta/lyne-elements/icon.js';
import '@sbb-esta/lyne-elements/icon.js';

@Directive({
  selector: 'sbb-icon',
  standalone: true,
})
export class SbbIcon {
  #element: ElementRef<SbbIconElement> = inject(ElementRef<SbbIconElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set name(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.name = value));
  }
  public get name(): string {
    return this.#element.nativeElement.name;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'no-sanitize', transform: booleanAttribute })
  public set noSanitize(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.noSanitize = value));
  }
  public get noSanitize(): boolean {
    return this.#element.nativeElement.noSanitize;
  }
}
