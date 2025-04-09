import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import { SbbProtectiveRoom } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type { SbbLogoElement } from '@sbb-esta/lyne-elements/logo.js';
import '@sbb-esta/lyne-elements/logo.js';

@Directive({
  selector: 'sbb-logo',
})
export class SbbLogo {
  #element: ElementRef<SbbLogoElement> = inject(ElementRef<SbbLogoElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set protectiveRoom(value: SbbProtectiveRoom) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.protectiveRoom = value));
  }
  public get protectiveRoom(): SbbProtectiveRoom {
    return this.#element.nativeElement.protectiveRoom;
  }

  @Input()
  public set accessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accessibilityLabel = value));
  }
  public get accessibilityLabel(): string {
    return this.#element.nativeElement.accessibilityLabel;
  }

  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }
}
