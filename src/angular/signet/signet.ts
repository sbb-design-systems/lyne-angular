/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbSignetElement, SbbSignetProtectiveRoom } from '@sbb-esta/lyne-elements/signet.js';
import '@sbb-esta/lyne-elements/signet.js';

@Directive({
  selector: 'sbb-signet',
  standalone: true,
})
export class SbbSignetDirective {
  #element: ElementRef<SbbSignetElement> = inject(ElementRef<SbbSignetElement>);
  #ngZone: NgZone = inject(NgZone);

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'protective-room' })
  public set protectiveRoom(value: SbbSignetProtectiveRoom) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.protectiveRoom = value));
  }
  public get protectiveRoom(): SbbSignetProtectiveRoom {
    return this.#element.nativeElement.protectiveRoom;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'accessibility-label' })
  public set accessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accessibilityLabel = value));
  }
  public get accessibilityLabel(): string {
    return this.#element.nativeElement.accessibilityLabel;
  }
}