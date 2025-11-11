import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type { SbbAlertGroupElement } from '@sbb-esta/lyne-elements/alert/alert-group.js';
import type { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/alert/alert-group.js';

/**
 * It can be used as a container for one or more `sbb-alert` component.
 *
 * @slot  - Use the unnamed slot to add `sbb-alert` elements to the `sbb-alert-group`.
 * @slot accessibility-title - title for this `sbb-alert-group` which is only visible for screen reader users.
 */
@Directive({
  selector: 'sbb-alert-group',
  exportAs: 'sbbAlertGroup',
})
export class SbbAlertGroup {
  #element: ElementRef<SbbAlertGroupElement> = inject(ElementRef<SbbAlertGroupElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * The role attribute defines how to announce alerts to the user.
   *
   * 'status': sets aria-live to polite and aria-atomic to true.
   * 'alert': sets aria-live to assertive and aria-atomic to true.
   */
  @Input()
  public set role(value: 'alert' | 'status' | string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.role = value));
  }
  public get role(): 'alert' | 'status' | string {
    return this.#element.nativeElement.role;
  }

  /**
   * Title for this alert group which is only visible for screen reader users.
   */
  @Input()
  public set accessibilityTitle(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accessibilityTitle = value));
  }
  public get accessibilityTitle(): string {
    return this.#element.nativeElement.accessibilityTitle;
  }

  /**
   * Level of the accessibility title, will be rendered as heading tag (e.g. h2). Defaults to level 2.
   */
  @Input()
  public set accessibilityTitleLevel(value: SbbTitleLevel) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.accessibilityTitleLevel = value),
    );
  }
  public get accessibilityTitleLevel(): SbbTitleLevel {
    return this.#element.nativeElement.accessibilityTitleLevel;
  }

  protected _emptyOutput = outputFromObservable<Event>(NEVER, { alias: 'empty' });
  /**
   * Emits when `sbb-alert-group` becomes empty.
   */
  public emptyOutput = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'empty'),
  );
}
