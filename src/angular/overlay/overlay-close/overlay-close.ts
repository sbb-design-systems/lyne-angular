import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { assignOverlayResult } from '@sbb-esta/lyne-elements/overlay.js';

/**
 * Directive to close an overlay. Can be placed on any action element inside the overlay.
 * The input value will be passed as the result when closing the overlay.
 */
@Directive({
  selector: '[sbb-overlay-close]',
  exportAs: 'sbbOverlayClose',
  host: { '[attr.sbb-overlay-close]': '""' },
})
export class SbbOverlayClose {
  #elementRef = inject(ElementRef<HTMLElement>);
  #ngZone = inject(NgZone);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  /** Optional value to return when the overlay is closed. */
  @Input('sbb-overlay-close')
  public get result(): any {
    return this.#result;
  }
  public set result(value: any) {
    this.#result = value;
    this.#ngZone.runOutsideAngular(() =>
      assignOverlayResult(this.#elementRef.nativeElement, value),
    );
  }
  #result: any = null;
  /* eslint-enable @typescript-eslint/no-explicit-any */
}
