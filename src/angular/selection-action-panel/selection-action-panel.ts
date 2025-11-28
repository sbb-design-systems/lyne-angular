import { Directive, ElementRef, inject } from '@angular/core';
import type { SbbCheckboxGroupElement } from '@sbb-esta/lyne-elements/checkbox/checkbox-group.js';
import type { SbbCheckboxPanelElement } from '@sbb-esta/lyne-elements/checkbox/checkbox-panel.js';
import type {
  SbbRadioButtonGroupElement,
  SbbRadioButtonPanelElement,
} from '@sbb-esta/lyne-elements/radio-button.js';
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

  /**
   * Group element if present
   */
  public get group(): SbbRadioButtonGroupElement | SbbCheckboxGroupElement | null {
    return this.#element.nativeElement.group;
  }

  /**
   * Input panel element
   */
  public get panel(): SbbCheckboxPanelElement | SbbRadioButtonPanelElement | null {
    return this.#element.nativeElement.panel;
  }
}
