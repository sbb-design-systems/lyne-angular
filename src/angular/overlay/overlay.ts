import { Directive, ElementRef, inject, Input, NgZone, type OutputRef } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { booleanAttribute, internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type { SbbOverlayCloseEventDetails } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type { SbbOverlayElement } from '@sbb-esta/lyne-elements/overlay.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/overlay.js';

@Directive({
  selector: 'sbb-overlay',
  exportAs: 'sbbOverlay',
})
export class SbbOverlay {
  #element: ElementRef<SbbOverlayElement> = inject(ElementRef<SbbOverlayElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set expanded(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.expanded = value));
  }
  public get expanded(): boolean {
    return this.#element.nativeElement.expanded;
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

  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }

  @Input()
  public set trigger(value: string | HTMLElement | null) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.trigger = value as HTMLElement | null),
    );
  }
  public get trigger(): HTMLElement | null {
    return this.#element.nativeElement.trigger;
  }

  @Input()
  public set accessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accessibilityLabel = value));
  }
  public get accessibilityLabel(): string {
    return this.#element.nativeElement.accessibilityLabel;
  }

  @Input({ transform: booleanAttribute })
  public set skipFocusRestoration(value: boolean) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.skipFocusRestoration = value),
    );
  }
  public get skipFocusRestoration(): boolean {
    return this.#element.nativeElement.skipFocusRestoration;
  }

  public get isOpen(): boolean {
    return this.#element.nativeElement.isOpen;
  }

  public open(): void {
    return this.#element.nativeElement.open();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public close(result?: any, target?: HTMLElement): any {
    return this.#element.nativeElement.close(result, target);
  }

  public beforeCloseOutput: OutputRef<CustomEvent<SbbOverlayCloseEventDetails>> =
    outputFromObservable(
      fromEvent<CustomEvent<SbbOverlayCloseEventDetails>>(
        this.#element.nativeElement,
        'beforeclose',
      ),
      { alias: 'beforeClose' },
    );

  protected _closeOutput: OutputRef<CustomEvent<SbbOverlayCloseEventDetails>> =
    outputFromObservable<CustomEvent<SbbOverlayCloseEventDetails>>(NEVER, {
      alias: 'close',
    });
  public closeOutput: OutputRef<CustomEvent<SbbOverlayCloseEventDetails>> =
    internalOutputFromObservable(
      fromEvent<CustomEvent<SbbOverlayCloseEventDetails>>(this.#element.nativeElement, 'close'),
    );

  public beforeOpenOutput: OutputRef<Event> = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeopen'),
    { alias: 'beforeOpen' },
  );

  protected _openOutput: OutputRef<Event> = outputFromObservable<Event>(NEVER, { alias: 'open' });
  public openOutput: OutputRef<Event> = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'open'),
  );

  public escapeStrategy(): void {
    return this.#element.nativeElement.escapeStrategy();
  }
}
