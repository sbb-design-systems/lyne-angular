import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbNavigationElement } from '@sbb-esta/lyne-elements/navigation/navigation.js';
import '@sbb-esta/lyne-elements/navigation/navigation.js';

@Directive({
  selector: 'sbb-navigation',
  exportAs: 'sbbNavigation',
})
export class SbbNavigation {
  #element: ElementRef<SbbNavigationElement> = inject(ElementRef<SbbNavigationElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set trigger(value: HTMLElement | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.trigger = value));
  }
  public get trigger(): HTMLElement | null {
    return this.#element.nativeElement.trigger;
  }

  @Input()
  public set accessibilityCloseLabel(value: string) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.accessibilityCloseLabel = value),
    );
  }
  public get accessibilityCloseLabel(): string {
    return this.#element.nativeElement.accessibilityCloseLabel;
  }

  public get activeNavigationSection(): HTMLElement | null {
    return this.#element.nativeElement.activeNavigationSection;
  }

  public get isOpen(): boolean {
    return this.#element.nativeElement.isOpen;
  }

  public open(): void {
    return this.#element.nativeElement.open();
  }

  public close(): void {
    return this.#element.nativeElement.close();
  }

  public get closeButton(): HTMLElement | null {
    return this.#element.nativeElement.closeButton;
  }

  public get navigationContent(): HTMLElement | null {
    return this.#element.nativeElement.navigationContent;
  }
}
