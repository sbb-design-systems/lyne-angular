import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbOccupancy } from '@sbb-esta/lyne-elements/core.js';
import { SbbTrainWagonLinkElement } from '@sbb-esta/lyne-elements/train.pure.js';

/**
 * It displays a train compartment within a `sbb-train` component and behaves like a link.
 * It can be used to display the train compartment as well as to trigger an action, e.g., to show more details about the train compartment.
 *
 * @slot  - Use the unnamed slot to add one or more `sbb-icon` for meta-information of the wagon.
 */
@Directive({
  selector: 'sbb-train-wagon-link',
  exportAs: 'sbbTrainWagonLink',
})
export class SbbTrainWagonLink {
  static {
    SbbTrainWagonLinkElement.define();
  }

  #element: ElementRef<SbbTrainWagonLinkElement> = inject(ElementRef<SbbTrainWagonLinkElement>);
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

  /**
   * The href value you want to link to.
   */
  @Input()
  public set href(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.href = value));
  }
  public get href(): string {
    return this.#element.nativeElement.href;
  }

  /**
   * Where to display the linked URL.
   */
  @Input()
  public set target(value: '_blank' | '_self' | '_parent' | '_top' | string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.target = value));
  }
  public get target(): '_blank' | '_self' | '_parent' | '_top' | string {
    return this.#element.nativeElement.target;
  }

  /**
   * The relationship of the linked URL as space-separated link types.
   */
  @Input()
  public set rel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.rel = value));
  }
  public get rel(): string {
    return this.#element.nativeElement.rel;
  }

  /**
   * Whether the browser will show the download dialog on click.
   */
  @Input({ transform: booleanAttribute })
  public set download(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.download = value));
  }
  public get download(): boolean {
    return this.#element.nativeElement.download;
  }

  /**
   * This will be forwarded as aria-label to the inner anchor element.
   */
  @Input()
  public set accessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accessibilityLabel = value));
  }
  public get accessibilityLabel(): string {
    return this.#element.nativeElement.accessibilityLabel;
  }

  /**
   * This will be forwarded as aria-current to the inner anchor element.
   */
  @Input()
  public set accessibilityCurrent(value: string) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.accessibilityCurrent = value),
    );
  }
  public get accessibilityCurrent(): string {
    return this.#element.nativeElement.accessibilityCurrent;
  }
}
