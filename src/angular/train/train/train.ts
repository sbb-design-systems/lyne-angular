/* eslint-disable @angular-eslint/directive-selector, @angular-eslint/directive-class-suffix */
import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';
import type { SbbTrainElement } from '@sbb-esta/lyne-elements/train/train.js';
import '@sbb-esta/lyne-elements/train/train.js';

@Directive({
  selector: 'sbb-train',
  standalone: true,
})
export class SbbTrain {
  #element: ElementRef<SbbTrainElement> = inject(ElementRef<SbbTrainElement>);
  #ngZone: NgZone = inject(NgZone);

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'direction-label' })
  public set directionLabel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.directionLabel = value));
  }
  public get directionLabel(): string {
    return this.#element.nativeElement.directionLabel;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'direction-label-level' })
  public set directionLabelLevel(value: SbbTitleLevel) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.directionLabelLevel = value));
  }
  public get directionLabelLevel(): SbbTitleLevel {
    return this.#element.nativeElement.directionLabelLevel;
  }

  @Input()
  public set station(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.station = value));
  }
  public get station(): string {
    return this.#element.nativeElement.station;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'accessibility-label' })
  public set accessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accessibilityLabel = value));
  }
  public get accessibilityLabel(): string {
    return this.#element.nativeElement.accessibilityLabel;
  }

  @Input()
  public set direction(value: 'left' | 'right') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.direction = value));
  }
  public get direction(): 'left' | 'right' {
    return this.#element.nativeElement.direction;
  }
}
