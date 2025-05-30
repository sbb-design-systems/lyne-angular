import { Directive, ElementRef, inject, Input, NgZone, Output } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbAutocompleteGridElement } from '@sbb-esta/lyne-elements/autocomplete-grid/autocomplete-grid.js';
import { fromEvent, NEVER, type Observable } from 'rxjs';

import '@sbb-esta/lyne-elements/autocomplete-grid/autocomplete-grid.js';

@Directive({
  selector: 'sbb-autocomplete-grid',
  exportAs: 'sbbAutocompleteGrid',
})
export class SbbAutocompleteGrid {
  #element: ElementRef<SbbAutocompleteGridElement> = inject(ElementRef<SbbAutocompleteGridElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }

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

  @Input({ transform: booleanAttribute })
  public set preserveIconSpace(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.preserveIconSpace = value));
  }
  public get preserveIconSpace(): boolean {
    return this.#element.nativeElement.preserveIconSpace;
  }

  @Output('willOpen') protected _willOpen: (typeof this)['willOpen'] = NEVER;
  public willOpen: Observable<CustomEvent<void>> = fromEvent<CustomEvent<void>>(
    this.#element.nativeElement,
    'willOpen',
  );

  @Output('didOpen') protected _didOpen: (typeof this)['didOpen'] = NEVER;
  public didOpen: Observable<CustomEvent<void>> = fromEvent<CustomEvent<void>>(
    this.#element.nativeElement,
    'didOpen',
  );

  @Output('willClose') protected _willClose: (typeof this)['willClose'] = NEVER;
  public willClose: Observable<CustomEvent<void>> = fromEvent<CustomEvent<void>>(
    this.#element.nativeElement,
    'willClose',
  );

  @Output('didClose') protected _didClose: (typeof this)['didClose'] = NEVER;
  public didClose: Observable<CustomEvent<void>> = fromEvent<CustomEvent<void>>(
    this.#element.nativeElement,
    'didClose',
  );

  public get originElement(): HTMLElement | null {
    return this.#element.nativeElement.originElement;
  }

  public get triggerElement(): HTMLInputElement | null | undefined {
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

  @Input({ transform: booleanAttribute })
  public set autoActiveFirstOption(value: boolean) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.autoActiveFirstOption = value),
    );
  }
  public get autoActiveFirstOption(): boolean {
    return this.#element.nativeElement.autoActiveFirstOption;
  }
}
