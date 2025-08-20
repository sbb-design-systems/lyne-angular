import { NgModule } from '@angular/core';

import { SbbAutocompleteGrid } from './autocomplete-grid/autocomplete-grid';
import { SbbAutocompleteGridButton } from './autocomplete-grid-button/autocomplete-grid-button';
import { SbbAutocompleteGridCell } from './autocomplete-grid-cell/autocomplete-grid-cell';
import { SbbAutocompleteGridOptgroup } from './autocomplete-grid-optgroup/autocomplete-grid-optgroup';
import { SbbAutocompleteGridOption } from './autocomplete-grid-option/autocomplete-grid-option';
import { SbbAutocompleteGridRow } from './autocomplete-grid-row/autocomplete-grid-row';

const EXPORTED_DECLARATIONS = [
  SbbAutocompleteGrid,
  SbbAutocompleteGridButton,
  SbbAutocompleteGridCell,
  SbbAutocompleteGridOptgroup,
  SbbAutocompleteGridOption,
  SbbAutocompleteGridRow,
];

@NgModule({
  imports: EXPORTED_DECLARATIONS,
  exports: EXPORTED_DECLARATIONS,
})
export class SbbAutocompleteGridModule {}
