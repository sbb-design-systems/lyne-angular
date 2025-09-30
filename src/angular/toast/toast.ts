import { Directive, ElementRef, inject, Input, NgZone, numberAttribute } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { booleanAttribute, internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type { SbbToastElement, SbbToastPosition } from '@sbb-esta/lyne-elements/toast.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/toast.js';

@Directive({
  selector: 'sbb-toast',
  exportAs: 'sbbToast',
})
export class SbbToast {
  #element: ElementRef<SbbToastElement> = inject(ElementRef<SbbToastElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input({ transform: numberAttribute })
  public set timeout(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.timeout = value));
  }
  public get timeout(): number {
    return this.#element.nativeElement.timeout;
  }

  @Input()
  public set position(value: SbbToastPosition) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.position = value));
  }
  public get position(): SbbToastPosition {
    return this.#element.nativeElement.position;
  }

  @Input({ transform: booleanAttribute })
  public set readOnly(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.readOnly = value));
  }
  public get readOnly(): boolean {
    return this.#element.nativeElement.readOnly;
  }

  @Input()
  public set politeness(value: 'polite' | 'assertive' | 'off') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.politeness = value));
  }
  public get politeness(): 'polite' | 'assertive' | 'off' {
    return this.#element.nativeElement.politeness;
  }

  @Input()
  public set iconName(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.iconName = value));
  }
  public get iconName(): string {
    return this.#element.nativeElement.iconName;
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

  public beforeOpenOutput = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeopen'),
    { alias: 'beforeOpen' },
  );

  protected _openOutput = outputFromObservable<Event>(NEVER, { alias: 'open' });
  public openOutput = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'open'),
  );

  public beforeCloseOutput = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeclose'),
    { alias: 'beforeClose' },
  );

  protected _closeOutput = outputFromObservable<Event>(NEVER, { alias: 'close' });
  public closeOutput = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'close'),
  );

  public escapeStrategy(): void {
    return this.#element.nativeElement.escapeStrategy();
  }
}
