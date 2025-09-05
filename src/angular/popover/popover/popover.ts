import { Directive, ElementRef, inject, Input, NgZone, numberAttribute } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { booleanAttribute, internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type { SbbPopoverElement } from '@sbb-esta/lyne-elements/popover/popover.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/popover/popover.js';

@Directive({
  selector: 'sbb-popover',
  exportAs: 'sbbPopover',
})
export class SbbPopover {
  #element: ElementRef<SbbPopoverElement> = inject(ElementRef<SbbPopoverElement>);
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

  @Input({ transform: booleanAttribute })
  public set hideCloseButton(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.hideCloseButton = value));
  }
  public get hideCloseButton(): boolean {
    return this.#element.nativeElement.hideCloseButton;
  }

  @Input({ transform: booleanAttribute })
  public set hoverTrigger(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.hoverTrigger = value));
  }
  public get hoverTrigger(): boolean {
    return this.#element.nativeElement.hoverTrigger;
  }

  @Input({ transform: numberAttribute })
  public set openDelay(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.openDelay = value));
  }
  public get openDelay(): number {
    return this.#element.nativeElement.openDelay;
  }

  @Input({ transform: numberAttribute })
  public set closeDelay(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.closeDelay = value));
  }
  public get closeDelay(): number {
    return this.#element.nativeElement.closeDelay;
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

  public get isOpen(): boolean {
    return this.#element.nativeElement.isOpen;
  }

  public open(): void {
    return this.#element.nativeElement.open();
  }

  public close(target: HTMLElement): void {
    return this.#element.nativeElement.close(target);
  }

  public beforeCloseOutput = outputFromObservable(
    fromEvent<CustomEvent<{ closeTarget: HTMLElement | null }>>(
      this.#element.nativeElement,
      'beforeclose',
    ),
    { alias: 'beforeClose' },
  );

  protected _closeOutput = outputFromObservable<CustomEvent<{ closeTarget: HTMLElement | null }>>(
    NEVER,
    { alias: 'close' },
  );
  public closeOutput = internalOutputFromObservable(
    fromEvent<CustomEvent<{ closeTarget: HTMLElement | null }>>(
      this.#element.nativeElement,
      'close',
    ),
  );

  public beforeOpenOutput = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeopen'),
    { alias: 'beforeOpen' },
  );

  protected _openOutput = outputFromObservable<Event>(NEVER, { alias: 'open' });
  public openOutput = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'open'),
  );
}
