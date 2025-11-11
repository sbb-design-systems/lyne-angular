import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { LinkTargetType } from '@sbb-esta/lyne-elements/core/base-elements.js';
import type { SbbTeaserElement } from '@sbb-esta/lyne-elements/teaser.js';

import '@sbb-esta/lyne-elements/teaser.js';

/**
 * It displays an interactive image with caption.
 *
 * @slot image - Slot used to render the image.
 * @slot chip - Slot for the `sbb-chip-label` element. The slot on the `sbb-chip-label` element is automatically assigned when slotted in the unnamed slot.
 * @slot title - Slot for the title. For the standard `sbb-title` element, the slot is automatically assigned when slotted in the unnamed slot.
 * @slot  - Use the unnamed slot to render the description, the sbb-title and the sbb-chip-label.
 */
@Directive({
  selector: 'sbb-teaser',
  exportAs: 'sbbTeaser',
})
export class SbbTeaser {
  #element: ElementRef<SbbTeaserElement> = inject(ElementRef<SbbTeaserElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Teaser variant - define the position and the alignment of the text block.
   */
  @Input()
  public set alignment(value: 'after-centered' | 'after' | 'below') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.alignment = value));
  }
  public get alignment(): 'after-centered' | 'after' | 'below' {
    return this.#element.nativeElement.alignment;
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
  public set target(value: LinkTargetType | string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.target = value));
  }
  public get target(): LinkTargetType | string {
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
