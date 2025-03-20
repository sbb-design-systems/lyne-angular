import { Directive, ElementRef, inject, Input, NgZone, Output } from '@angular/core';
import type { SbbStickyBarElement } from '@sbb-esta/lyne-elements/container/sticky-bar.js';
import { fromEvent, type Observable, NEVER } from 'rxjs';

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

  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('willStick') protected _willStick: (typeof this)['willStick'] = NEVER;
  public willStick: Observable<void> = fromEvent<void>(this.#element.nativeElement, 'willStick');

  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('didStick') protected _didStick: (typeof this)['didStick'] = NEVER;
  public didStick: Observable<void> = fromEvent<void>(this.#element.nativeElement, 'didStick');

  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('willUnstick') protected _willUnstick: (typeof this)['willUnstick'] = NEVER;
  public willUnstick: Observable<void> = fromEvent<void>(
    this.#element.nativeElement,
    'willUnstick',
  );

  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('didUnstick') protected _didUnstick: (typeof this)['didUnstick'] = NEVER;
  public didUnstick: Observable<void> = fromEvent<void>(this.#element.nativeElement, 'didUnstick');

  public stick(): void {
    return this.#element.nativeElement.stick();
  }

  public unstick(): void {
    return this.#element.nativeElement.unstick();
  }
}
