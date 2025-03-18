import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbStickyBarElement } from '@sbb-esta/lyne-elements/container/sticky-bar.js';
import { fromEvent, type Observable } from 'rxjs';

import '@sbb-esta/lyne-elements/container/sticky-bar.js';

@Directive({
  selector: 'sbb-sticky-bar',
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

  public willStick: Observable<void> = fromEvent<void>(this.#element.nativeElement, 'willStick');

  public didStick: Observable<void> = fromEvent<void>(this.#element.nativeElement, 'didStick');

  public willUnstick: Observable<void> = fromEvent<void>(
    this.#element.nativeElement,
    'willUnstick',
  );

  public didUnstick: Observable<void> = fromEvent<void>(this.#element.nativeElement, 'didUnstick');

  public stick(): void {
    return this.#element.nativeElement.stick();
  }

  public unstick(): void {
    return this.#element.nativeElement.unstick();
  }
}
