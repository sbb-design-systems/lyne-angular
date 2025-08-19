import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { outputFromObservable, toSignal } from '@angular/core/rxjs-interop';
import type { SbbAutocompleteType } from '@sbb-esta/lyne-angular/autocomplete';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbAutocompleteGridElement } from '@sbb-esta/lyne-elements/autocomplete-grid/autocomplete-grid.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/autocomplete-grid/autocomplete-grid.js';

@Directive({
  selector: 'sbb-autocomplete-grid',
  exportAs: 'sbbAutocompleteGrid',
})
export class SbbAutocompleteGrid<T = string> implements SbbAutocompleteType<T> {
  #element: ElementRef<SbbAutocompleteGridElement<T>> = inject(
    ElementRef<SbbAutocompleteGridElement<T>>,
  );
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set size(value: 'm' | 's') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 'm' | 's' {
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
  public set origin(value: string | HTMLElement | null) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.origin = value as HTMLElement | null),
    );
  }
  public get origin(): HTMLElement | null {
    return this.#element.nativeElement.origin;
  }

  @Input()
  public set trigger(value: string | HTMLInputElement | null) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.trigger = value as HTMLInputElement | null),
    );
  }
  public get trigger(): HTMLInputElement | null {
    return this.#element.nativeElement.trigger;
  }

  @Input({ transform: booleanAttribute })
  public set preserveIconSpace(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.preserveIconSpace = value));
  }
  public get preserveIconSpace(): boolean {
    return this.#element.nativeElement.preserveIconSpace;
  }

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

  @Input()
  public set displayWith(value: ((value: T) => string) | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.displayWith = value));
  }
  public get displayWith(): ((value: T) => string) | null {
    return this.#element.nativeElement.displayWith;
  }

  public beforeOpenSignal = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeopen'),
    { alias: 'beforeOpen' },
  );

  protected _openSignal = outputFromObservable<Event>(NEVER, { alias: 'open' });
  public openSignal = toSignal(fromEvent<Event>(this.#element.nativeElement, 'open'));

  public beforeCloseSignal = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeclose'),
    { alias: 'beforeClose' },
  );

  protected _closeSignal = outputFromObservable<Event>(NEVER, { alias: 'close' });
  public closeSignal = toSignal(fromEvent<Event>(this.#element.nativeElement, 'close'));

  public optionSelected = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'optionselected'),
    { alias: 'optionSelected' },
  );
}
