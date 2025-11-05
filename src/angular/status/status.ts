import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbStatusElement, SbbStatusType } from '@sbb-esta/lyne-elements/status.js';

import '@sbb-esta/lyne-elements/status.js';

/**
 * Displays a message to the user's attention.
 *
 * @slot  - Use the unnamed slot to add an optional `sbb-title` and content to the status message.
 * @slot icon - Use this slot to override the default status icon.
 * @slot title - Slot for the title. For the standard `sbb-title` element, the slot is automatically assigned when slotted in the unnamed slot.
 * @cssprop [--sbb-status-color=var(--sbb-color-iron)] - Specify a custom color, which will override the predefined color for any type.
 * @cssprop [--sbb-status-text-color=var(--sbb-status-color)] - Specify a custom text color, which will override the predefined color for any type. Only valid for a status without a title.
 */
@Directive({
  selector: 'sbb-status',
  exportAs: 'sbbStatus',
})
export class SbbStatus {
  #element: ElementRef<SbbStatusElement> = inject(ElementRef<SbbStatusElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * The type of the status.
   */
  @Input()
  public set type(value: SbbStatusType) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.type = value));
  }
  public get type(): SbbStatusType {
    return this.#element.nativeElement.type;
  }

  /**
   * The icon name we want to use, choose from the small icon variants
   * from the ui-icons category from here
   * https://icons.app.sbb.ch.
   */
  @Input()
  public set iconName(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.iconName = value));
  }
  public get iconName(): string {
    return this.#element.nativeElement.iconName;
  }
}
