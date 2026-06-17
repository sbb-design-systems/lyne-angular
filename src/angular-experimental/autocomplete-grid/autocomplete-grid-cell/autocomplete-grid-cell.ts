import { Directive } from '@angular/core';
import { SbbAutocompleteGridCellElement } from '@sbb-esta/lyne-elements-experimental/autocomplete-grid.pure.js';

/**
 * A wrapper component for autocomplete-grid action button.
 *
 * @slot  - Use the unnamed slot to add a `sbb-autocomplete-grid-button` element.
 */
@Directive({
  selector: 'sbb-autocomplete-grid-cell',
  exportAs: 'sbbAutocompleteGridCell',
})
export class SbbAutocompleteGridCell {
  static {
    SbbAutocompleteGridCellElement.define();
  }
}
