import {
  Directive,
  ElementRef,
  inject,
  Input,
  NgZone,
  numberAttribute,
  type OutputRef,
} from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import type { SbbTabGroupElement } from '@sbb-esta/lyne-elements/tabs/tab-group.js';
import type { SbbTabLabelElement } from '@sbb-esta/lyne-elements/tabs/tab-label.js';
import type { SbbTabElement } from '@sbb-esta/lyne-elements/tabs/tab.js';
import type { SbbTabChangedEventDetails } from '@sbb-esta/lyne-elements/tabs.js';
import { fromEvent } from 'rxjs';

import '@sbb-esta/lyne-elements/tabs/tab-group.js';

@Directive({
  selector: 'sbb-tab-group',
  exportAs: 'sbbTabGroup',
})
export class SbbTabGroup {
  #element: ElementRef<SbbTabGroupElement> = inject(ElementRef<SbbTabGroupElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set size(value: 's' | 'l' | 'xl') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 's' | 'l' | 'xl' {
    return this.#element.nativeElement.size;
  }

  @Input({ transform: numberAttribute })
  public set initialSelectedIndex(value: number) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.initialSelectedIndex = value),
    );
  }
  public get initialSelectedIndex(): number {
    return this.#element.nativeElement.initialSelectedIndex;
  }

  public disableTab(tabIndex: number): void {
    return this.#element.nativeElement.disableTab(tabIndex);
  }

  public enableTab(tabIndex: number): void {
    return this.#element.nativeElement.enableTab(tabIndex);
  }

  public activateTab(tabIndex: number): void {
    return this.#element.nativeElement.activateTab(tabIndex);
  }

  public tabChangeOutput: OutputRef<CustomEvent<SbbTabChangedEventDetails>> = outputFromObservable(
    fromEvent<CustomEvent<SbbTabChangedEventDetails>>(this.#element.nativeElement, 'tabchange'),
    { alias: 'tabChange' },
  );

  public get labels(): SbbTabLabelElement[] {
    return this.#element.nativeElement.labels;
  }

  public get tabs(): SbbTabElement[] {
    return this.#element.nativeElement.tabs;
  }
}
