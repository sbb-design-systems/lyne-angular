import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import { SbbAccordionElement } from '@sbb-esta/lyne-elements/accordion.pure.js';
import type { SbbHeadingLevel } from '@sbb-esta/lyne-elements/core.js';

/**
 * It can be used as a container for one or more `sbb-expansion-panel` component.
 *
 * @slot  - Use the unnamed slot to add `sbb-expansion-panel` elements.
 */
@Directive({
  selector: 'sbb-accordion',
  exportAs: 'sbbAccordion',
})
export class SbbAccordion {
  static {
    SbbAccordionElement.define();
  }

  #element: ElementRef<SbbAccordionElement> = inject(ElementRef<SbbAccordionElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Size variant, either s (lean theme default) or l (standard theme default).
   * The property overrides the size on any projected `sbb-expansion-panel`.
   */
  @Input()
  public set size(value: 's' | 'l' | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 's' | 'l' | null {
    return this.#element.nativeElement.size;
  }

  /**
   * The heading level for the sbb-expansion-panel-headers within the component.
   */
  @Input()
  public set titleLevel(value: SbbHeadingLevel | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.titleLevel = value));
  }
  public get titleLevel(): SbbHeadingLevel | null {
    return this.#element.nativeElement.titleLevel;
  }

  /**
   * Whether more than one sbb-expansion-panel can be open at the same time.
   */
  @Input({ transform: booleanAttribute })
  public set multi(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.multi = value));
  }
  public get multi(): boolean {
    return this.#element.nativeElement.multi;
  }
}
