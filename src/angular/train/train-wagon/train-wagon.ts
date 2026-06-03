import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbOccupancy } from '@sbb-esta/lyne-elements/core.js';
import type { SbbTrainWagonElement } from '@sbb-esta/lyne-elements/train.js';

import '@sbb-esta/lyne-elements/train.js';

/**
 * It displays a train compartment within a `sbb-train` component.
 *
 * @slot  - Use the unnamed slot to add one or more `sbb-icon` for meta-information of the wagon.
 */
@Directive({
  selector: 'sbb-train-wagon',
  exportAs: 'sbbTrainWagon',
})
export class SbbTrainWagon {
  #element: ElementRef<SbbTrainWagonElement> = inject(ElementRef<SbbTrainWagonElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Wagon type.
   * For `wagon-end-left` and `wagon-end-right`, please set the corresponding value of the `blockedPassage` property.
   */
  @Input()
  public set wagonType(
    value:
      | 'wagon'
      | 'wagon-end-left'
      | 'wagon-end-right'
      | 'couchette'
      | 'sleeping'
      | 'restaurant'
      | 'locomotive'
      | 'closed',
  ) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.wagonType = value));
  }
  public get wagonType():
    | 'wagon'
    | 'wagon-end-left'
    | 'wagon-end-right'
    | 'couchette'
    | 'sleeping'
    | 'restaurant'
    | 'locomotive'
    | 'closed' {
    return this.#element.nativeElement.wagonType;
  }

  /**
   * Occupancy of a wagon.
   */
  @Input()
  public set occupancy(value: SbbOccupancy | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.occupancy = value));
  }
  public get occupancy(): SbbOccupancy | null {
    return this.#element.nativeElement.occupancy;
  }

  /**
   * Sector in which the wagon stops.
   */
  @Input()
  public set sector(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.sector = value));
  }
  public get sector(): string {
    return this.#element.nativeElement.sector;
  }

  /**
   * Accessibility text for blocked passages of the wagon.
   */
  @Input()
  public set blockedPassage(value: 'previous' | 'next' | 'both' | 'none') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.blockedPassage = value));
  }
  public get blockedPassage(): 'previous' | 'next' | 'both' | 'none' {
    return this.#element.nativeElement.blockedPassage;
  }

  /**
   * Class label
   */
  @Input()
  public set wagonClass(value: '1' | '2' | '1-2' | '2-1' | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.wagonClass = value));
  }
  public get wagonClass(): '1' | '2' | '1-2' | '2-1' | null {
    return this.#element.nativeElement.wagonClass;
  }

  /**
   * Wagon number
   */
  @Input()
  public set label(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.label = value));
  }
  public get label(): string {
    return this.#element.nativeElement.label;
  }

  /**
   * Additional accessibility text which will be appended to the end.
   */
  @Input()
  public set additionalAccessibilityText(value: string) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.additionalAccessibilityText = value),
    );
  }
  public get additionalAccessibilityText(): string {
    return this.#element.nativeElement.additionalAccessibilityText;
  }
}
