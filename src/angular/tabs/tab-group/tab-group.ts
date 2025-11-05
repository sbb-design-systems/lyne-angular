import { Directive, ElementRef, inject, Input, NgZone, numberAttribute } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import type { SbbTabGroupElement } from '@sbb-esta/lyne-elements/tabs/tab-group.js';
import type { SbbTabLabelElement } from '@sbb-esta/lyne-elements/tabs/tab-label.js';
import type { SbbTabElement } from '@sbb-esta/lyne-elements/tabs/tab.js';
import type { SbbTabChangedEventDetails } from '@sbb-esta/lyne-elements/tabs.js';
import { fromEvent } from 'rxjs';

import '@sbb-esta/lyne-elements/tabs/tab-group.js';

/**
 * It displays one or more tabs, each one with a label and some content.
 *
 * @slot  - Use the unnamed slot to add content to the `sbb-tab-group` via `sbb-tab-label` and `sbb-tab` instances.
 */
@Directive({
  selector: 'sbb-tab-group',
  exportAs: 'sbbTabGroup',
})
export class SbbTabGroup {
  #element: ElementRef<SbbTabGroupElement> = inject(ElementRef<SbbTabGroupElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Size variant, either s, l or xl.
   */
  @Input()
  public set size(value: 's' | 'l' | 'xl') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 's' | 'l' | 'xl' {
    return this.#element.nativeElement.size;
  }

  /**
   * Sets the initial tab. If it matches a disabled tab or exceeds the length of
   * the tab group, the first enabled tab will be selected.
   */
  @Input({ transform: numberAttribute })
  public set initialSelectedIndex(value: number) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.initialSelectedIndex = value),
    );
  }
  public get initialSelectedIndex(): number {
    return this.#element.nativeElement.initialSelectedIndex;
  }

  /**
   * Disables a tab by index.
   */
  public disableTab(tabIndex: number): void {
    return this.#element.nativeElement.disableTab(tabIndex);
  }

  /**
   * Enables a tab by index.
   */
  public enableTab(tabIndex: number): void {
    return this.#element.nativeElement.enableTab(tabIndex);
  }

  /**
   * Activates a tab by index.
   */
  public activateTab(tabIndex: number): void {
    return this.#element.nativeElement.activateTab(tabIndex);
  }

  /**
   * The tabchange event is dispatched when a tab is selected.
   */
  public tabChangeOutput = outputFromObservable(
    fromEvent<CustomEvent<SbbTabChangedEventDetails>>(this.#element.nativeElement, 'tabchange'),
    { alias: 'tabChange' },
  );

  /**
   * Gets the slotted `sbb-tab-label`s.
   */
  public get labels(): SbbTabLabelElement[] {
    return this.#element.nativeElement.labels;
  }

  /**
   * Gets the slotted `sbb-tab`s.
   */
  public get tabs(): SbbTabElement[] {
    return this.#element.nativeElement.tabs;
  }
}
