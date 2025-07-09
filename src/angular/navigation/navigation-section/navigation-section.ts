import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbNavigationSectionElement } from '@sbb-esta/lyne-elements/navigation/navigation-section.js';

import '@sbb-esta/lyne-elements/navigation/navigation-section.js';

@Directive({
  selector: 'sbb-navigation-section',
  exportAs: 'sbbNavigationSection',
})
export class SbbNavigationSection {
  #element: ElementRef<SbbNavigationSectionElement> = inject(
    ElementRef<SbbNavigationSectionElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set titleContent(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.titleContent = value));
  }
  public get titleContent(): string {
    return this.#element.nativeElement.titleContent;
  }

  @Input()
  public set trigger(value: string | HTMLElement | null) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.trigger = value as HTMLElement | null),
    );
  }
  public get trigger(): HTMLElement | null {
    return this.#element.nativeElement.trigger;
  }

  @Input()
  public set accessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accessibilityLabel = value));
  }
  public get accessibilityLabel(): string {
    return this.#element.nativeElement.accessibilityLabel;
  }

  @Input()
  public set accessibilityBackLabel(value: string) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.accessibilityBackLabel = value),
    );
  }
  public get accessibilityBackLabel(): string {
    return this.#element.nativeElement.accessibilityBackLabel;
  }

  public open(): void {
    return this.#element.nativeElement.open();
  }

  public close(): void {
    return this.#element.nativeElement.close();
  }
}
