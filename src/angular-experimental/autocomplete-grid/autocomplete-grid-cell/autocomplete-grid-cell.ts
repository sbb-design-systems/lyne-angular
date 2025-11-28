import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements-experimental/autocomplete-grid/autocomplete-grid-cell.js';

/**
 * A wrapper component for autocomplete-grid action button.
 *
 * @slot  - Use the unnamed slot to add a `sbb-autocomplete-grid-button` element.
 */
@Directive({
  selector: 'sbb-autocomplete-grid-cell',
  exportAs: 'sbbAutocompleteGridCell',
})
export class SbbAutocompleteGridCell {}
