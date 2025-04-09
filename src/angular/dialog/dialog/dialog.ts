import { Directive, ElementRef, inject, Input, NgZone, Output } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import { SbbOverlayCloseEventDetails } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type { SbbDialogElement } from '@sbb-esta/lyne-elements/dialog/dialog.js';
import { fromEvent, type Observable, NEVER } from 'rxjs';
import '@sbb-esta/lyne-elements/dialog/dialog.js';

@Directive({
  selector: 'sbb-dialog',
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

  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }

  @Input()
  public set backdrop(value: 'opaque' | 'translucent') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.backdrop = value));
  }
  public get backdrop(): 'opaque' | 'translucent' {
    return this.#element.nativeElement.backdrop;
  }

  @Input()
  public set accessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accessibilityLabel = value));
  }
  public get accessibilityLabel(): string {
    return this.#element.nativeElement.accessibilityLabel;
  }

  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('willOpen') protected _willOpen: (typeof this)['willOpen'] = NEVER;
  public willOpen: Observable<void> = fromEvent<void>(this.#element.nativeElement, 'willOpen');

  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('didOpen') protected _didOpen: (typeof this)['didOpen'] = NEVER;
  public didOpen: Observable<void> = fromEvent<void>(this.#element.nativeElement, 'didOpen');

  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('willClose') protected _willClose: (typeof this)['willClose'] = NEVER;
  public willClose: Observable<void> = fromEvent<void>(this.#element.nativeElement, 'willClose');

  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('didClose') protected _didClose: (typeof this)['didClose'] = NEVER;
  public didClose: Observable<SbbOverlayCloseEventDetails> = fromEvent<SbbOverlayCloseEventDetails>(
    this.#element.nativeElement,
    'didClose',
  );

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
