import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbDialogElement } from '@sbb-esta/lyne-elements/dialog/dialog.js';

import '@sbb-esta/lyne-elements/dialog/dialog.js';

@Directive({
  selector: 'sbb-dialog',
  exportAs: 'sbbDialog',
})
export class SbbDialog {
  #element: ElementRef<SbbDialogElement> = inject(ElementRef<SbbDialogElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set backdropAction(value: 'close' | 'none') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.backdropAction = value));
  }
  public get backdropAction(): 'close' | 'none' {
    return this.#element.nativeElement.backdropAction;
  }

  @Input()
  public set backdrop(value: 'opaque' | 'translucent') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.backdrop = value));
  }
  public get backdrop(): 'opaque' | 'translucent' {
    return this.#element.nativeElement.backdrop;
  }

  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }

  @Input()
  public set trigger(value: HTMLElement | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.trigger = value));
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
  public close(result: any, target: HTMLElement): any {
    return this.#element.nativeElement.close(result, target);
  }
}
