import { Directive } from '@angular/core';
import { SbbAutocompleteRowElement } from '@sbb-esta/lyne-elements/autocomplete.pure.js';
/**
 * The component is used as a wrapper for an option and one or more action buttons.
 *
 * @slot  - Use the unnamed slot to add a `sbb-option` followed by one or more `sbb-autocomplete-button` elements.
 */
@Directive({
  selector: 'sbb-autocomplete-row',
  exportAs: 'sbbAutocompleteRow',
})
export class SbbAutocompleteRow {
  static {
    SbbAutocompleteRowElement.define();
  }
}
