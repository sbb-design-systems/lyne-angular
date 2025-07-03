import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { outputFromObservable, toSignal } from '@angular/core/rxjs-interop';
import type { SbbStickyBarElement } from '@sbb-esta/lyne-elements/container/sticky-bar.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/container/sticky-bar.js';

@Directive({
  selector: 'sbb-sticky-bar',
  exportAs: 'sbbStickyBar',
})
export class SbbStickyBar {
  #element: ElementRef<SbbStickyBarElement> = inject(ElementRef<SbbStickyBarElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set color(value: 'white' | 'milk' | 'midnight' | 'charcoal' | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.color = value));
  }
  public get color(): 'white' | 'milk' | 'midnight' | 'charcoal' | null {
    return this.#element.nativeElement.color;
  }

  @Input()
  public set size(value: 'm' | 's') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 'm' | 's' {
    return this.#element.nativeElement.size;
  }

  public stick(): void {
    return this.#element.nativeElement.stick();
  }

  public unstick(): void {
    return this.#element.nativeElement.unstick();
  }

  protected _stickSignal = outputFromObservable<Event>(NEVER, { alias: 'stick' });
  public stickSignal = toSignal(fromEvent<Event>(this.#element.nativeElement, 'stick'));

  protected _unstickSignal = outputFromObservable<Event>(NEVER, { alias: 'unstick' });
  public unstickSignal = toSignal(fromEvent<Event>(this.#element.nativeElement, 'unstick'));

  public beforeStickSignal = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforestick'),
    { alias: 'beforeStick' },
  );

  public beforeUnstickSignal = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeunstick'),
    { alias: 'beforeUnstick' },
  );
}
