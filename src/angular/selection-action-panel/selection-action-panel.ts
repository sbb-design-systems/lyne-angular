import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbSelectionActionPanelElement } from '@sbb-esta/lyne-elements/selection-action-panel.js';

import '@sbb-esta/lyne-elements/selection-action-panel.js';

/**
 * It displays a panel connected to a `sbb-checkbox` or to a `sbb-radio-button`.
It can also contain an action element (e.g. an `sbb-button`)
 *
 * @slot  - Use this slot to render a `sbb-checkbox-panel` or `sbb-radio-button-panel` element and the action element.
 * @slot badge - Use this slot to render a `sbb-card-badge` component.
 */
@Directive({
  selector: 'sbb-selection-action-panel',
  exportAs: 'sbbSelectionActionPanel',
})
export class SbbSelectionActionPanel {
  #element: ElementRef<SbbSelectionActionPanelElement> = inject(
    ElementRef<SbbSelectionActionPanelElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  /**
   * The background color of the panel.
   */
  @Input()
  public set color(value: 'white' | 'milk') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.color = value));
  }
  public get color(): 'white' | 'milk' {
    return this.#element.nativeElement.color;
  }

  /**
   * Whether the unselected panel has a border.
   */
  @Input({ transform: booleanAttribute })
  public set borderless(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.borderless = value));
  }
  public get borderless(): boolean {
    return this.#element.nativeElement.borderless;
  }
}
