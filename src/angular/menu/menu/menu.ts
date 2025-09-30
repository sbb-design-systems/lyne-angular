import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type { SbbMenuElement } from '@sbb-esta/lyne-elements/menu/menu.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/menu/menu.js';

@Directive({
  selector: 'sbb-menu',
  exportAs: 'sbbMenu',
})
export class SbbMenu {
  #element: ElementRef<SbbMenuElement> = inject(ElementRef<SbbMenuElement>);
  #ngZone: NgZone = inject(NgZone);

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
  public set listAccessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.listAccessibilityLabel = value),
    );
  }
  public get listAccessibilityLabel(): string {
    return this.#element.nativeElement.listAccessibilityLabel;
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

  public closeAll(): void {
    return this.#element.nativeElement.closeAll();
  }
}
