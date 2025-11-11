import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/autocomplete-grid/autocomplete-grid-row.js';

/**
 * The component is used as a wrapper for options and action buttons.
 *
 * @slot  - Use the unnamed slot to add a `sbb-autocomplete-grid-option` and a `sbb-autocomplete-grid-cell` with one or more `sbb-autocomplete-grid-button`.
 */
@Directive({
  selector: 'sbb-autocomplete-grid-row',
  exportAs: 'sbbAutocompleteGridRow',
})
export class SbbAutocompleteGridRow {}
