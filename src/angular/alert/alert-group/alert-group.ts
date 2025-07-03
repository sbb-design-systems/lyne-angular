import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { outputFromObservable, toSignal } from '@angular/core/rxjs-interop';
import type { SbbAlertGroupElement } from '@sbb-esta/lyne-elements/alert/alert-group.js';
import type { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/alert/alert-group.js';

@Directive({
  selector: 'sbb-alert-group',
  exportAs: 'sbbAlertGroup',
})
export class SbbAlertGroup {
  #element: ElementRef<SbbAlertGroupElement> = inject(ElementRef<SbbAlertGroupElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set role(value: 'alert' | 'status' | string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.role = value));
  }
  public get role(): 'alert' | 'status' | string {
    return this.#element.nativeElement.role;
  }

  @Input()
  public set accessibilityTitle(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accessibilityTitle = value));
  }
  public get accessibilityTitle(): string {
    return this.#element.nativeElement.accessibilityTitle;
  }

  @Input()
  public set accessibilityTitleLevel(value: SbbTitleLevel) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.accessibilityTitleLevel = value),
    );
  }
  public get accessibilityTitleLevel(): SbbTitleLevel {
    return this.#element.nativeElement.accessibilityTitleLevel;
  }

  protected _emptySignal = outputFromObservable<Event>(NEVER, { alias: 'empty' });
  public emptySignal = toSignal(fromEvent<Event>(this.#element.nativeElement, 'empty'));
}
