import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import { SbbTeaserElement } from '@sbb-esta/lyne-elements/teaser.pure.js';

/**
 * It displays an interactive image with caption.
 *
 * @slot action - Slot for a static action, e.g. a `<sbb-secondary-button-static>` element. The action is displayed below the description.
 * @slot chip - Slot for the `sbb-chip-label` element. The slot on the `sbb-chip-label` element is automatically assigned when slotted in the unnamed slot.
 * @slot image - Slot used to render the image.
 * @slot title - Slot for the title. For the standard `sbb-title` element, the slot is automatically assigned when slotted in the unnamed slot.
 * @slot  - Use the unnamed slot to render the description, the sbb-title and the sbb-chip-label.
 */
@Directive({
  selector: 'sbb-teaser',
  exportAs: 'sbbTeaser',
})
export class SbbTeaser {
  static {
    SbbTeaserElement.define();
  }

  #element: ElementRef<SbbTeaserElement> = inject(ElementRef<SbbTeaserElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Teaser variant - define the position and the alignment of the text block.
   */
  @Input()
  public set alignment(value: 'before' | 'before-centered' | 'after' | 'after-centered' | 'below') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.alignment = value));
  }
  public get alignment(): 'before' | 'before-centered' | 'after' | 'after-centered' | 'below' {
    return this.#element.nativeElement.alignment;
  }

  /**
   * Size variant, either m (default) or l.
   */
  @Input()
  public set size(value: 'm' | 'l' | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 'm' | 'l' | null {
    return this.#element.nativeElement.size;
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
