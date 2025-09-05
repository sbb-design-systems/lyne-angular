import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbOptionElement } from '@sbb-esta/lyne-elements/option/option.js';
import { fromEvent } from 'rxjs';

import '@sbb-esta/lyne-elements/option/option.js';

@Directive({
  selector: 'sbb-option',
  exportAs: 'sbbOption',
})
export class SbbOption<T = string> {
  #element: ElementRef<SbbOptionElement<T>> = inject(ElementRef<SbbOptionElement<T>>);
  #ngZone: NgZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set disabled(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disabled = value));
  }
  public get disabled(): boolean {
    return this.#element.nativeElement.disabled;
  }

  @Input()
  public set iconName(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.iconName = value));
  }
  public get iconName(): string {
    return this.#element.nativeElement.iconName;
  }

  @Input()
  public set value(value: T) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
  }
  public get value(): T {
    return this.#element.nativeElement.value;
  }

  @Input({ transform: booleanAttribute })
  public set selected(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.selected = value));
  }
  public get selected(): boolean {
    return this.#element.nativeElement.selected;
  }

  public optionSelectionChangeOutput = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'optionselectionchange'),
    { alias: 'optionSelectionChange' },
  );

  public optionSelectedOutput = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'optionselected'),
    { alias: 'optionSelected' },
  );
}
