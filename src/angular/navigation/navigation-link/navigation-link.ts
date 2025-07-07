import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { LinkTargetType } from '@sbb-esta/lyne-elements/core/base-elements.js';
import type { SbbNavigationLinkElement } from '@sbb-esta/lyne-elements/navigation/navigation-link.js';
import type { SbbNavigationMarkerElement } from '@sbb-esta/lyne-elements/navigation/navigation-marker.js';
import type { SbbNavigationSectionElement } from '@sbb-esta/lyne-elements/navigation/navigation-section.js';
import type { SbbNavigationActionSize } from '@sbb-esta/lyne-elements/navigation.js';

import '@sbb-esta/lyne-elements/navigation/navigation-link.js';

@Directive({
  selector: 'sbb-navigation-link',
  exportAs: 'sbbNavigationLink',
})
export class SbbNavigationLink {
  #element: ElementRef<SbbNavigationLinkElement> = inject(ElementRef<SbbNavigationLinkElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set size(value: SbbNavigationActionSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): SbbNavigationActionSize {
    return this.#element.nativeElement.size;
  }

  @Input()
  public set connectedSection(value: SbbNavigationSectionElement | undefined) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.connectedSection = value));
  }
  public get connectedSection(): SbbNavigationSectionElement | undefined {
    return this.#element.nativeElement.connectedSection;
  }

  @Input()
  public set href(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.href = value));
  }
  public get href(): string {
    return this.#element.nativeElement.href;
  }

  @Input()
  public set target(value: LinkTargetType | string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.target = value));
  }
  public get target(): LinkTargetType | string {
    return this.#element.nativeElement.target;
  }

  @Input()
  public set rel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.rel = value));
  }
  public get rel(): string {
    return this.#element.nativeElement.rel;
  }

  @Input({ transform: booleanAttribute })
  public set download(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.download = value));
  }
  public get download(): boolean {
    return this.#element.nativeElement.download;
  }

  @Input()
  public set accessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accessibilityLabel = value));
  }
  public get accessibilityLabel(): string {
    return this.#element.nativeElement.accessibilityLabel;
  }

  public get marker(): SbbNavigationMarkerElement | null {
    return this.#element.nativeElement.marker;
  }

  public get section(): SbbNavigationSectionElement | null {
    return this.#element.nativeElement.section;
  }

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
