import { Directive, ElementRef, inject, Input, NgZone, Output } from '@angular/core';
import type { SbbValidationChangeEvent } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type { SbbTimeInputElement } from '@sbb-esta/lyne-elements/time-input.js';
import { fromEvent, NEVER, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/time-input.js';

@Directive({
  selector: 'sbb-time-input',
  exportAs: 'sbbTimeInput',
})
export class SbbTimeInput {
  #element: ElementRef<SbbTimeInputElement> = inject(ElementRef<SbbTimeInputElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set input(value: string | HTMLElement | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.input = value));
  }
  public get input(): string | HTMLElement | null {
    return this.#element.nativeElement.input;
  }

  @Input()
  public set valueAsDate(value: Date | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.valueAsDate = value));
  }
  public get valueAsDate(): Date | null {
    return this.#element.nativeElement.valueAsDate;
  }

  @Output('didChange') protected _didChange: (typeof this)['didChange'] = NEVER;
  public didChange: Observable<CustomEvent<void>> = fromEvent<CustomEvent<void>>(
    this.#element.nativeElement,
    'didChange',
  );

  @Output('validationChange') protected _validationChange: (typeof this)['validationChange'] =
    NEVER;
  public validationChange: Observable<CustomEvent<SbbValidationChangeEvent>> = fromEvent<
    CustomEvent<SbbValidationChangeEvent>
  >(this.#element.nativeElement, 'validationChange');
}
