/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbNavigationSectionElement } from '@sbb-esta/lyne-elements/navigation/navigation-section.js';
import '@sbb-esta/lyne-elements/navigation/navigation-section.js';

@Directive({
  selector: 'sbb-navigation-section',
  standalone: true,
})
export class SbbNavigationSectionDirective {
  #element: ElementRef<SbbNavigationSectionElement> = inject(
    ElementRef<SbbNavigationSectionElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'title-content' })
  public set titleContent(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.titleContent = value));
  }
  public get titleContent(): string {
    return this.#element.nativeElement.titleContent;
  }

  @Input()
  public set trigger(value: string | HTMLElement | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.trigger = value));
  }
  public get trigger(): string | HTMLElement | null {
    return this.#element.nativeElement.trigger;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'accessibility-label' })
  public set accessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accessibilityLabel = value));
  }
  public get accessibilityLabel(): string {
    return this.#element.nativeElement.accessibilityLabel;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'accessibility-back-label' })
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
