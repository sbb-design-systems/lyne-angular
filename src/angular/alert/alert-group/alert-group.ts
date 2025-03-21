import { Directive, ElementRef, inject, Input, NgZone, Output } from '@angular/core';
import type { SbbAlertGroupElement } from '@sbb-esta/lyne-elements/alert/alert-group.js';
import { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';
import { fromEvent, type Observable, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/alert/alert-group.js';

@Directive({
  selector: 'sbb-alert-group',
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

  @Input({ alias: 'accessibility-title' })
  public set accessibilityTitle(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accessibilityTitle = value));
  }
  public get accessibilityTitle(): string {
    return this.#element.nativeElement.accessibilityTitle;
  }

  @Input({ alias: 'accessibility-title-level' })
  public set accessibilityTitleLevel(value: SbbTitleLevel) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.accessibilityTitleLevel = value),
    );
  }
  public get accessibilityTitleLevel(): SbbTitleLevel {
    return this.#element.nativeElement.accessibilityTitleLevel;
  }

  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('empty') protected _empty: (typeof this)['empty'] = NEVER;
  public empty: Observable<void> = fromEvent<void>(this.#element.nativeElement, 'empty');
}
