import { Directive, ElementRef, inject } from '@angular/core';
import { SbbTabLabelElement } from '@sbb-esta/lyne-elements/tabs/tab-label.js';
import type { SbbTabElement } from '@sbb-esta/lyne-elements/tabs/tab.js';
import '@sbb-esta/lyne-elements/tabs/tab.js';

@Directive({
  selector: 'sbb-tab',
})
export class SbbTab {
  #element: ElementRef<SbbTabElement> = inject(ElementRef<SbbTabElement>);

  public get label(): SbbTabLabelElement | null {
    return this.#element.nativeElement.label;
  }
}
