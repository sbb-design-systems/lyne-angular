import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbButtonElement } from '@sbb-esta/lyne-elements/button.js';
import type { SbbHorizontalFrom } from '@sbb-esta/lyne-elements/core.js';
import type { SbbDialogActionsElement } from '@sbb-esta/lyne-elements/dialog.js';
import type { SbbBlockLinkElement } from '@sbb-esta/lyne-elements/link.js';

import '@sbb-esta/lyne-elements/dialog.js';

/**
 * Use this component to display a footer into an `sbb-dialog` with an action group.
 *
 * @slot  - Use the unnamed slot to add `sbb-block-link` or `sbb-button` elements to the `sbb-dialog-actions`.
 */
@Directive({
  selector: 'sbb-dialog-actions',
  exportAs: 'sbbDialogActions',
})
export class SbbDialogActions {
  #element: ElementRef<SbbDialogActionsElement> = inject(ElementRef<SbbDialogActionsElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Set the slotted `<sbb-action-group>` children's alignment.
   */
  @Input()
  public set alignGroup(value: 'start' | 'center' | 'stretch' | 'end') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.alignGroup = value));
  }
  public get alignGroup(): 'start' | 'center' | 'stretch' | 'end' {
    return this.#element.nativeElement.alignGroup;
  }

  /**
   * Overrides the behavior of `orientation` property.
   */
  @Input()
  public set horizontalFrom(value: SbbHorizontalFrom) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.horizontalFrom = value));
  }
  public get horizontalFrom(): SbbHorizontalFrom {
    return this.#element.nativeElement.horizontalFrom;
  }

  /**
   * Indicates the orientation of the components inside the `<sbb-action-group>`.
   */
  @Input()
  public set orientation(value: 'horizontal' | 'vertical') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.orientation = value));
  }
  public get orientation(): 'horizontal' | 'vertical' {
    return this.#element.nativeElement.orientation;
  }

  /**
   * Size of the nested sbb-button instances.
   * This will overwrite the size attribute of nested sbb-button instances.
   */
  @Input()
  public set buttonSize(value: string | SbbButtonElement['size']) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.buttonSize = value as SbbButtonElement['size']),
    );
  }
  public get buttonSize(): SbbButtonElement['size'] {
    return this.#element.nativeElement.buttonSize;
  }

  /**
   * Size of the nested sbb-block-link instances.
   * This will overwrite the size attribute of nested sbb-block-link instances.
   */
  @Input()
  public set linkSize(value: string | SbbBlockLinkElement['size']) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.linkSize = value as SbbBlockLinkElement['size']),
    );
  }
  public get linkSize(): SbbBlockLinkElement['size'] {
    return this.#element.nativeElement.linkSize;
  }
}
