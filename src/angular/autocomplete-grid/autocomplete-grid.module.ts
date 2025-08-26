import { SbbAutocompleteTrigger } from '@sbb-esta/lyne-angular/autocomplete';

import { SbbAutocompleteGrid } from './autocomplete-grid/autocomplete-grid';
import { SbbAutocompleteGridButton } from './autocomplete-grid-button/autocomplete-grid-button';
import { SbbAutocompleteGridCell } from './autocomplete-grid-cell/autocomplete-grid-cell';
import { SbbAutocompleteGridOptgroup } from './autocomplete-grid-optgroup/autocomplete-grid-optgroup';
import { SbbAutocompleteGridOption } from './autocomplete-grid-option/autocomplete-grid-option';
import { SbbAutocompleteGridRow } from './autocomplete-grid-row/autocomplete-grid-row';

export const SbbAutocompleteGridModule = [
  SbbAutocompleteTrigger,
  SbbAutocompleteGrid,
  SbbAutocompleteGridButton,
  SbbAutocompleteGridCell,
  SbbAutocompleteGridOptgroup,
  SbbAutocompleteGridOption,
  SbbAutocompleteGridRow,
] as const;
