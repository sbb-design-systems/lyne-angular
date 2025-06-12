import { Directive, ElementRef, inject, Input, NgZone, Output } from '@angular/core';
import type { SbbStickyBarElement } from '@sbb-esta/lyne-elements/container/sticky-bar.js';
import { fromEvent, NEVER, type Observable } from 'rxjs';

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

  @Output('willStick') protected _willStick: (typeof this)['willStick'] = NEVER;
  public willStick: Observable<CustomEvent<void>> = fromEvent<CustomEvent<void>>(
    this.#element.nativeElement,
    'willStick',
  );

  @Output('didStick') protected _didStick: (typeof this)['didStick'] = NEVER;
  public didStick: Observable<CustomEvent<void>> = fromEvent<CustomEvent<void>>(
    this.#element.nativeElement,
    'didStick',
  );

  @Output('willUnstick') protected _willUnstick: (typeof this)['willUnstick'] = NEVER;
  public willUnstick: Observable<CustomEvent<void>> = fromEvent<CustomEvent<void>>(
    this.#element.nativeElement,
    'willUnstick',
  );

  @Output('didUnstick') protected _didUnstick: (typeof this)['didUnstick'] = NEVER;
  public didUnstick: Observable<CustomEvent<void>> = fromEvent<CustomEvent<void>>(
    this.#element.nativeElement,
    'didUnstick',
  );

  public stick(): void {
    return this.#element.nativeElement.stick();
  }

  public unstick(): void {
    return this.#element.nativeElement.unstick();
  }
}
