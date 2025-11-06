import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { LinkTargetType } from '@sbb-esta/lyne-elements/core/base-elements.js';
import type { SbbTeaserHeroElement } from '@sbb-esta/lyne-elements/teaser-hero.js';

import '@sbb-esta/lyne-elements/teaser-hero.js';

/**
 * It displays an image and an action call within a panel.
 *
 * @slot  - Use the unnamed slot to add text content to the panel
 * @slot link-content - Link content of the panel
 * @slot image - The background image that can be a `sbb-image`
 * @slot chip - The `sbb-chip-label` component that will be displayed on top-left corner
 */
@Directive({
  selector: 'sbb-teaser-hero',
  exportAs: 'sbbTeaserHero',
})
export class SbbTeaserHero {
  #element: ElementRef<SbbTeaserHeroElement> = inject(ElementRef<SbbTeaserHeroElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Panel link text.
   */
  @Input()
  public set linkContent(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.linkContent = value));
  }
  public get linkContent(): string {
    return this.#element.nativeElement.linkContent;
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
