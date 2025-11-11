import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbTrainFormationElement } from '@sbb-esta/lyne-elements/train/train-formation.js';

import '@sbb-esta/lyne-elements/train/train-formation.js';

/**
 * It displays a train composition, acting as a container for one or more `sbb-train` component.
 *
 * @slot  - Use the unnamed slot to add 'sbb-train' elements to the `sbb-train-formation`.
 * @cssprop [--sbb-train-formation-padding-inline=0px] - Defines the inline padding inside the horizontal scrolling area.
 */
@Directive({
  selector: 'sbb-train-formation',
  exportAs: 'sbbTrainFormation',
})
export class SbbTrainFormation {
  #element: ElementRef<SbbTrainFormationElement> = inject(ElementRef<SbbTrainFormationElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Whether the view of the wagons is from side or top perspective.
   */
  @Input()
  public set view(value: 'side' | 'top') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.view = value));
  }
  public get view(): 'side' | 'top' {
    return this.#element.nativeElement.view;
  }
}
