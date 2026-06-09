import { Directive, ElementRef, inject } from '@angular/core';
import type { SbbCheckboxGroupElement } from '@sbb-esta/lyne-elements/checkbox-group.pure.js';
import type { SbbCheckboxPanelElement } from '@sbb-esta/lyne-elements/checkbox-panel.pure.js';
import type { SbbRadioButtonGroupElement } from '@sbb-esta/lyne-elements/radio-button-group.pure.js';
import type { SbbRadioButtonPanelElement } from '@sbb-esta/lyne-elements/radio-button-panel.pure.js';
import { SbbSelectionActionPanelElement } from '@sbb-esta/lyne-elements/selection-action-panel.pure.js';

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
  static {
    SbbSelectionActionPanelElement.define();
  }

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
