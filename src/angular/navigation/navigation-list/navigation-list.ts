import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbNavigationListElement } from '@sbb-esta/lyne-elements/navigation/navigation-list.js';

import '@sbb-esta/lyne-elements/navigation/navigation-list.js';

@Directive({
  selector: 'sbb-navigation-list',
  exportAs: 'sbbNavigationList',
})
export class SbbNavigationList {
  #element: ElementRef<SbbNavigationListElement> = inject(ElementRef<SbbNavigationListElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set label(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.label = value));
  }
  public get label(): string {
    return this.#element.nativeElement.label;
  }
}
