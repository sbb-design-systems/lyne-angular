import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { nullOnEmptyAttribute } from '@sbb-esta/lyne-angular/core';
import { assignDialogResult } from '@sbb-esta/lyne-elements/dialog.pure.js';

/**
 * Directive to close a dialog. Can be placed on any action element inside the dialog.
 * The input value will be passed as the result when closing the dialog.
 */
@Directive({
  selector: '[sbb-dialog-close]',
  exportAs: 'sbbDialogClose',
  host: {
    '[attr.sbb-dialog-close]': '""',
  },
})
export class SbbDialogClose {
  #elementRef = inject(ElementRef<HTMLElement>);
  #ngZone = inject(NgZone);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  /** Optional value to return when the dialog is closed. */
  @Input({ alias: 'sbb-dialog-close', transform: nullOnEmptyAttribute })
  public get result(): any {
    return this.#result;
  }
  public set result(value: any) {
    this.#result = value;
    this.#ngZone.runOutsideAngular(() =>
      assignDialogResult(this.#elementRef.nativeElement, this.#result),
    );
  }
  #result: any = null;
  /* eslint-enable @typescript-eslint/no-explicit-any */
}
