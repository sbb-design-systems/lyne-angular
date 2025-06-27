import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbMenuElement } from '@sbb-esta/lyne-elements/menu/menu.js';
import '@sbb-esta/lyne-elements/menu/menu.js';

@Directive({
  selector: 'sbb-menu',
  exportAs: 'sbbMenu',
})
export class SbbMenu {
  #element: ElementRef<SbbMenuElement> = inject(ElementRef<SbbMenuElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set trigger(value: HTMLElement | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.trigger = value));
  }
  public get trigger(): HTMLElement | null {
    return this.#element.nativeElement.trigger;
  }

  @Input()
  public set listAccessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.listAccessibilityLabel = value),
    );
  }
  public get listAccessibilityLabel(): string {
    return this.#element.nativeElement.listAccessibilityLabel;
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
}
