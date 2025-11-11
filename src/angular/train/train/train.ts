import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';
import type { SbbTrainElement } from '@sbb-esta/lyne-elements/train/train.js';

import '@sbb-esta/lyne-elements/train/train.js';

/**
 * It can be used as a container for `sbb-train-wagon` or `sbb-train-blocked-passage` components.
 *
 * @slot  - Use the unnamed slot to add 'sbb-train-wagon' elements to the `sbb-train`.
 */
@Directive({
  selector: 'sbb-train',
  exportAs: 'sbbTrain',
})
export class SbbTrain {
  #element: ElementRef<SbbTrainElement> = inject(ElementRef<SbbTrainElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * General label for "driving direction".
   */
  @Input()
  public set directionLabel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.directionLabel = value));
  }
  public get directionLabel(): string {
    return this.#element.nativeElement.directionLabel;
  }

  /**
   * Heading level of the direction label, used for screen readers.
   */
  @Input()
  public set directionLabelLevel(value: SbbTitleLevel) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.directionLabelLevel = value));
  }
  public get directionLabelLevel(): SbbTitleLevel {
    return this.#element.nativeElement.directionLabelLevel;
  }

  /**
   * Label for the destination station of the train.
   */
  @Input()
  public set station(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.station = value));
  }
  public get station(): string {
    return this.#element.nativeElement.station;
  }

  /**
   * Accessibility label for additional information regarding the leaving direction of the train.
   */
  @Input()
  public set accessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accessibilityLabel = value));
  }
  public get accessibilityLabel(): string {
    return this.#element.nativeElement.accessibilityLabel;
  }

  /**
   * Controls the direction indicator to show the arrow left or right. Default is left.
   */
  @Input()
  public set direction(value: 'left' | 'right') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.direction = value));
  }
  public get direction(): 'left' | 'right' {
    return this.#element.nativeElement.direction;
  }
}
