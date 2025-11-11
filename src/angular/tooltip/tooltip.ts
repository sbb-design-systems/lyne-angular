import {
  Directive,
  ElementRef,
  Input,
  NgZone,
  inject,
  numberAttribute,
  type OutputRef,
} from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { booleanAttribute, internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type { SbbTooltipElement } from '@sbb-esta/lyne-elements/tooltip.js';
import { NEVER, fromEvent } from 'rxjs';
import '@sbb-esta/lyne-elements/tooltip.js';

@Directive({
  selector: 'sbb-tooltip',
  exportAs: 'sbbTooltip',
})
export class SbbTooltip {
  #element: ElementRef<SbbTooltipElement> = inject(ElementRef<SbbTooltipElement>);
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

  @Input({ transform: numberAttribute })
  public set longPressCloseDelay(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.longPressCloseDelay = value));
  }
  public get longPressCloseDelay(): number {
    return this.#element.nativeElement.longPressCloseDelay;
  }

  @Input({ transform: booleanAttribute })
  public set disabled(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disabled = value));
  }
  public get disabled(): boolean {
    return this.#element.nativeElement.disabled;
  }

  public beforeOpenOutput: OutputRef<Event> = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeopen'),
    { alias: 'beforeOpen' },
  );

  protected _openOutput: OutputRef<Event> = outputFromObservable<Event>(NEVER, { alias: 'open' });
  public openOutput: OutputRef<Event> = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'open'),
  );

  public beforeCloseOutput: OutputRef<Event> = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeclose'),
    { alias: 'beforeClose' },
  );

  protected _closeOutput: OutputRef<Event> = outputFromObservable<Event>(NEVER, { alias: 'close' });
  public closeOutput: OutputRef<Event> = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'close'),
  );

  public get isOpen(): boolean {
    return this.#element.nativeElement.isOpen;
  }

  public open(): void {
    return this.#element.nativeElement.open();
  }

  public close(): void {
    return this.#element.nativeElement.close();
  }

  public escapeStrategy(): void {
    return this.#element.nativeElement.escapeStrategy();
  }
}
