import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import { SbbTeaserStaticElement } from '@sbb-esta/lyne-elements/teaser.pure.js';
/**
 * Non-interactive variant of the `<sbb-teaser>`.
 *
 * @slot action - Slot for an interactive action, e.g. a `<sbb-secondary-button-link>` element. The action is displayed below the description.
 * @slot chip - Slot for the `sbb-chip-label` element. The slot on the `sbb-chip-label` element is automatically assigned when slotted in the unnamed slot.
 * @slot image - Slot used to render the image.
 * @slot title - Slot for the title. For the standard `sbb-title` element, the slot is automatically assigned when slotted in the unnamed slot.
 * @slot  - Use the unnamed slot to render the description, the sbb-title and the sbb-chip-label.
 */
@Directive({
  selector: 'sbb-teaser-static',
  exportAs: 'sbbTeaserStatic',
})
export class SbbTeaserStatic {
  static {
    SbbTeaserStaticElement.define();
  }

  #element: ElementRef<SbbTeaserStaticElement> = inject(ElementRef<SbbTeaserStaticElement>);
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
}
