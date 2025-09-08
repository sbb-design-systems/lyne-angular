import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbSelectionActionPanelElement } from '@sbb-esta/lyne-elements/selection-action-panel.js';

import '@sbb-esta/lyne-elements/selection-action-panel.js';

@Directive({
  selector: 'sbb-selection-action-panel',
  exportAs: 'sbbSelectionActionPanel',
})
export class SbbSelectionActionPanel {
  #element: ElementRef<SbbSelectionActionPanelElement> = inject(
    ElementRef<SbbSelectionActionPanelElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set color(value: 'white' | 'milk') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.color = value));
  }
  public get color(): 'white' | 'milk' {
    return this.#element.nativeElement.color;
  }

  @Input({ transform: booleanAttribute })
  public set borderless(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.borderless = value));
  }
  public get borderless(): boolean {
    return this.#element.nativeElement.borderless;
  }
}
