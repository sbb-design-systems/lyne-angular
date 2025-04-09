import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute, SbbRouterLinkSupportMixin } from '@sbb-esta/lyne-angular/core';
import type { SbbTransparentButtonLinkElement } from '@sbb-esta/lyne-elements/button/transparent-button-link.js';
import { SbbButtonSize } from '@sbb-esta/lyne-elements/button.js';
import { LinkTargetType } from '@sbb-esta/lyne-elements/core/base-elements.js';

import '@sbb-esta/lyne-elements/button/transparent-button-link.js';

@Directive({
  selector: 'sbb-transparent-button-link',
})
export class SbbTransparentButtonLink extends SbbRouterLinkSupportMixin(class {}) {
  #element: ElementRef<SbbTransparentButtonLinkElement> = inject(
    ElementRef<SbbTransparentButtonLinkElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set size(value: SbbButtonSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): SbbButtonSize {
    return this.#element.nativeElement.size;
  }

  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }

  @Input()
  public set iconName(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.iconName = value));
  }
  public get iconName(): string {
    return this.#element.nativeElement.iconName;
  }

  @Input({ transform: booleanAttribute })
  public set disabledInteractive(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disabledInteractive = value));
  }
  public get disabledInteractive(): boolean {
    return this.#element.nativeElement.disabledInteractive;
  }

  @Input({ transform: booleanAttribute })
  public set disabled(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disabled = value));
  }
  public get disabled(): boolean {
    return this.#element.nativeElement.disabled;
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
