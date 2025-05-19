import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbButtonSize } from '@sbb-esta/lyne-elements/button.js';
import type { SbbHorizontalFrom, SbbOrientation } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type { SbbDialogActionsElement } from '@sbb-esta/lyne-elements/dialog/dialog-actions.js';
import type { SbbLinkSize } from '@sbb-esta/lyne-elements/link.js';
import '@sbb-esta/lyne-elements/dialog/dialog-actions.js';

@Directive({
  selector: 'sbb-dialog-actions',
  exportAs: 'sbbDialogActions',
})
export class SbbDialogActions {
  #element: ElementRef<SbbDialogActionsElement> = inject(ElementRef<SbbDialogActionsElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set alignGroup(value: 'start' | 'center' | 'stretch' | 'end') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.alignGroup = value));
  }
  public get alignGroup(): 'start' | 'center' | 'stretch' | 'end' {
    return this.#element.nativeElement.alignGroup;
  }

  @Input()
  public set horizontalFrom(value: SbbHorizontalFrom) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.horizontalFrom = value));
  }
  public get horizontalFrom(): SbbHorizontalFrom {
    return this.#element.nativeElement.horizontalFrom;
  }

  @Input()
  public set orientation(value: SbbOrientation) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.orientation = value));
  }
  public get orientation(): SbbOrientation {
    return this.#element.nativeElement.orientation;
  }

  @Input()
  public set buttonSize(value: SbbButtonSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.buttonSize = value));
  }
  public get buttonSize(): SbbButtonSize {
    return this.#element.nativeElement.buttonSize;
  }

  @Input()
  public set linkSize(value: SbbLinkSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.linkSize = value));
  }
  public get linkSize(): SbbLinkSize {
    return this.#element.nativeElement.linkSize;
  }
}
