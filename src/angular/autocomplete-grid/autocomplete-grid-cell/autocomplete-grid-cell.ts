import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/autocomplete-grid/autocomplete-grid-cell.js';

@Directive({
  selector: 'sbb-autocomplete-grid-cell',
  exportAs: 'sbbAutocompleteGridCell',
})
export class SbbAutocompleteGridCell {}
