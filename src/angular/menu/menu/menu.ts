/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, inject, Input, NgZone, Output } from '@angular/core';
import type { SbbMenuElement } from '@sbb-esta/lyne-elements/menu/menu.js';
import { fromEvent, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/menu/menu.js';

@Directive({
  selector: 'sbb-menu',
  standalone: true,
})
export class SbbMenuDirective {
  #element: ElementRef<SbbMenuElement> = inject(ElementRef<SbbMenuElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set trigger(value: string | HTMLElement | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.trigger = value));
  }
  public get trigger(): string | HTMLElement | null {
    return this.#element.nativeElement.trigger;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'list-accessibility-label' })
  public set listAccessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.listAccessibilityLabel = value),
    );
  }
  public get listAccessibilityLabel(): string {
    return this.#element.nativeElement.listAccessibilityLabel;
  }

  @Output() public willOpen: Observable<void> = fromEvent<void>(
    this.#element.nativeElement,
    'willOpen',
  );

  @Output() public didOpen: Observable<void> = fromEvent<void>(
    this.#element.nativeElement,
    'didOpen',
  );

  @Output() public willClose: Observable<void> = fromEvent<void>(
    this.#element.nativeElement,
    'willClose',
  );

  @Output() public didClose: Observable<void> = fromEvent<void>(
    this.#element.nativeElement,
    'didClose',
  );

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
