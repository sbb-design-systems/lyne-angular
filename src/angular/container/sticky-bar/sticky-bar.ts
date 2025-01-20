/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, inject, Input, NgZone, Output } from '@angular/core';
import type { SbbStickyBarElement } from '@sbb-esta/lyne-elements/container/sticky-bar.js';
import { fromEvent, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/container/sticky-bar.js';

@Directive({
  selector: 'sbb-sticky-bar',
  standalone: true,
})
export class SbbStickyBarDirective {
  #element: ElementRef<SbbStickyBarElement> = inject(ElementRef<SbbStickyBarElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set color(value: 'white' | 'milk' | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.color = value));
  }
  public get color(): 'white' | 'milk' | null {
    return this.#element.nativeElement.color;
  }

  @Output() public willStick: Observable<void> = fromEvent<void>(
    this.#element.nativeElement,
    'willStick',
  );

  @Output() public didStick: Observable<void> = fromEvent<void>(
    this.#element.nativeElement,
    'didStick',
  );

  @Output() public willUnstick: Observable<void> = fromEvent<void>(
    this.#element.nativeElement,
    'willUnstick',
  );

  @Output() public didUnstick: Observable<void> = fromEvent<void>(
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
