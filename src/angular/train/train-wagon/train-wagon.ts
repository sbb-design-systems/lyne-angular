/* eslint-disable @angular-eslint/directive-selector, @angular-eslint/directive-class-suffix */
import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import { SbbOccupancy } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type { SbbTrainWagonElement } from '@sbb-esta/lyne-elements/train/train-wagon.js';
import '@sbb-esta/lyne-elements/train/train-wagon.js';

@Directive({
  selector: 'sbb-train-wagon',
  standalone: true,
})
export class SbbTrainWagon {
  #element: ElementRef<SbbTrainWagonElement> = inject(ElementRef<SbbTrainWagonElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set type(
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
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.type = value));
  }
  public get type():
    | 'wagon'
    | 'wagon-end-left'
    | 'wagon-end-right'
    | 'couchette'
    | 'sleeping'
    | 'restaurant'
    | 'locomotive'
    | 'closed' {
    return this.#element.nativeElement.type;
  }

  @Input()
  public set occupancy(value: SbbOccupancy | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.occupancy = value));
  }
  public get occupancy(): SbbOccupancy | null {
    return this.#element.nativeElement.occupancy;
  }

  @Input()
  public set sector(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.sector = value));
  }
  public get sector(): string {
    return this.#element.nativeElement.sector;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'blocked-passage' })
  public set blockedPassage(value: 'previous' | 'next' | 'both' | 'none') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.blockedPassage = value));
  }
  public get blockedPassage(): 'previous' | 'next' | 'both' | 'none' {
    return this.#element.nativeElement.blockedPassage;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'wagon-class' })
  public set wagonClass(value: '1' | '2' | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.wagonClass = value));
  }
  public get wagonClass(): '1' | '2' | null {
    return this.#element.nativeElement.wagonClass;
  }

  @Input()
  public set label(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.label = value));
  }
  public get label(): string {
    return this.#element.nativeElement.label;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'additional-accessibility-text' })
  public set additionalAccessibilityText(value: string) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.additionalAccessibilityText = value),
    );
  }
  public get additionalAccessibilityText(): string {
    return this.#element.nativeElement.additionalAccessibilityText;
  }
}
