import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbFooterElement } from '@sbb-esta/lyne-elements/footer.js';
import type { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';

import '@sbb-esta/lyne-elements/footer.js';

/**
 * It displays a footer section for the page.
 *
 * @slot  - Use the unnamed slot to add elements like `sbb-block-link`, `sbb-link-list`, `sbb-divider` and so on.
 */
@Directive({
  selector: 'sbb-footer',
  exportAs: 'sbbFooter',
})
export class SbbFooter {
  #element: ElementRef<SbbFooterElement> = inject(ElementRef<SbbFooterElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Variants to display the footer. The default, displays the content in regular block element
   * approach. The clock-columns, used a CSS-grid for displaying the content over different
   * breakpoints.
   */
  @Input()
  public set variant(value: 'default' | 'clock-columns') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.variant = value));
  }
  public get variant(): 'default' | 'clock-columns' {
    return this.#element.nativeElement.variant;
  }

  /**
   * Whether to allow the footer content to stretch to full width.
   * By default, the content has the appropriate page size.
   */
  @Input({ transform: booleanAttribute })
  public set expanded(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.expanded = value));
  }
  public get expanded(): boolean {
    return this.#element.nativeElement.expanded;
  }

  /**
   * Footer title text, visually hidden, necessary for screen readers.
   */
  @Input()
  public set accessibilityTitle(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accessibilityTitle = value));
  }
  public get accessibilityTitle(): string {
    return this.#element.nativeElement.accessibilityTitle;
  }

  /**
   * Level of the accessibility title, will be rendered as heading tag (e.g. h1). Defaults to level 1.
   */
  @Input()
  public set accessibilityTitleLevel(value: SbbTitleLevel) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.accessibilityTitleLevel = value),
    );
  }
  public get accessibilityTitleLevel(): SbbTitleLevel {
    return this.#element.nativeElement.accessibilityTitleLevel;
  }

  /**
   * Negative coloring variant flag.
   */
  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }
}
