import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbSignetElement, SbbSignetProtectiveRoom } from '@sbb-esta/lyne-elements/signet.js';

import '@sbb-esta/lyne-elements/signet.js';

/**
 * It displays the SBB signet.
 * @cssprop [--sbb-signet-height=auto] - Can be used to set the height of the signet.
 */
@Directive({
  selector: 'sbb-signet',
  exportAs: 'sbbSignet',
})
export class SbbSignet {
  #element: ElementRef<SbbSignetElement> = inject(ElementRef<SbbSignetElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Visual protective room around signet.
   */
  @Input()
  public set protectiveRoom(value: SbbSignetProtectiveRoom) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.protectiveRoom = value));
  }
  public get protectiveRoom(): SbbSignetProtectiveRoom {
    return this.#element.nativeElement.protectiveRoom;
  }

  /**
   * Accessibility label which will be forwarded to the inner SVG signet.
   */
  @Input()
  public set accessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accessibilityLabel = value));
  }
  public get accessibilityLabel(): string {
    return this.#element.nativeElement.accessibilityLabel;
  }
}
