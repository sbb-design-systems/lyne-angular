import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { outputFromObservable, toSignal } from '@angular/core/rxjs-interop';
import type { SbbNavigationElement } from '@sbb-esta/lyne-elements/navigation/navigation.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/navigation/navigation.js';

@Directive({
  selector: 'sbb-navigation',
  exportAs: 'sbbNavigation',
})
export class SbbNavigation {
  #element: ElementRef<SbbNavigationElement> = inject(ElementRef<SbbNavigationElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set trigger(value: HTMLElement | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.trigger = value));
  }
  public get trigger(): HTMLElement | null {
    return this.#element.nativeElement.trigger;
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

  public get activeNavigationSection(): HTMLElement | null {
    return this.#element.nativeElement.activeNavigationSection;
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

  public get closeButton(): HTMLElement | null {
    return this.#element.nativeElement.closeButton;
  }

  public get navigationContent(): HTMLElement | null {
    return this.#element.nativeElement.navigationContent;
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
}
