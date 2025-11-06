import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { LinkTargetType } from '@sbb-esta/lyne-elements/core/base-elements.js';
import type { SbbNavigationLinkElement } from '@sbb-esta/lyne-elements/navigation/navigation-link.js';
import type { SbbNavigationMarkerElement } from '@sbb-esta/lyne-elements/navigation/navigation-marker.js';
import type { SbbNavigationSectionElement } from '@sbb-esta/lyne-elements/navigation/navigation-section.js';
import type { SbbNavigationActionSize } from '@sbb-esta/lyne-elements/navigation.js';

import '@sbb-esta/lyne-elements/navigation/navigation-link.js';

/**
 * It displays a link element that can be used in the `sbb-navigation` component.
 *
 * @slot  - Use the unnamed slot to add content to the `sbb-navigation-link`.
 */
@Directive({
  selector: 'sbb-navigation-link',
  exportAs: 'sbbNavigationLink',
})
export class SbbNavigationLink {
  #element: ElementRef<SbbNavigationLinkElement> = inject(ElementRef<SbbNavigationLinkElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Action size variant, either s, m or l.
   */
  @Input()
  public set size(value: SbbNavigationActionSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): SbbNavigationActionSize {
    return this.#element.nativeElement.size;
  }

  /**
   * The section that is beign controlled by the action, if any.
   */
  @Input()
  public set connectedSection(value: SbbNavigationSectionElement | undefined) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.connectedSection = value));
  }
  public get connectedSection(): SbbNavigationSectionElement | undefined {
    return this.#element.nativeElement.connectedSection;
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
   * The navigation marker in which the action is nested.
   */
  public get marker(): SbbNavigationMarkerElement | null {
    return this.#element.nativeElement.marker;
  }

  /**
   * The section in which the action is nested.
   */
  public get section(): SbbNavigationSectionElement | null {
    return this.#element.nativeElement.section;
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
