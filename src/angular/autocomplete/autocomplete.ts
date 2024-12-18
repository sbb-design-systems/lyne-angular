/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, Input, NgZone, Output, inject } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbAutocompleteBaseElement } from '@sbb-esta/lyne-elements/autocomplete.js';
import { fromEvent, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/autocomplete.js';

@Directive({
  selector: 'sbb-autocomplete',
  standalone: true,
})
export class SbbAutocompleteDirective {
  #element: ElementRef<SbbAutocompleteBaseElement> = inject(ElementRef<SbbAutocompleteBaseElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set origin(value: string | HTMLElement | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.origin = value));
  }
  public get origin(): string | HTMLElement | null {
    return this.#element.nativeElement.origin;
  }

  @Input()
  public set trigger(value: string | HTMLInputElement | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.trigger = value));
  }
  public get trigger(): string | HTMLInputElement | null {
    return this.#element.nativeElement.trigger;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'preserve-icon-space', transform: booleanAttribute })
  public set preserveIconSpace(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.preserveIconSpace = value));
  }
  public get preserveIconSpace(): boolean {
    return this.#element.nativeElement.preserveIconSpace;
  }

  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
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

  public get originElement(): HTMLElement {
    return this.#element.nativeElement.originElement;
  }

  public get triggerElement(): HTMLInputElement | undefined {
    return this.#element.nativeElement.triggerElement;
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
