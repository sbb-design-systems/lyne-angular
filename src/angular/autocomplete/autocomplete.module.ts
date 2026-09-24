import { NgModule } from '@angular/core';
import { SbbOptionModule } from '@sbb-esta/lyne-angular/option';

import { SbbAutocomplete } from './autocomplete/autocomplete';
import { SbbAutocompleteTrigger } from './autocomplete/autocomplete-trigger';
import { SbbAutocompleteButton } from './autocomplete-button/autocomplete-button';
import { SbbAutocompleteRow } from './autocomplete-row/autocomplete-row';

const SBB_AUTOCOMPLETE_EXPORTED_DECLARATIONS = [
  SbbAutocomplete,
  SbbAutocompleteButton,
  SbbAutocompleteRow,
  SbbAutocompleteTrigger,
  SbbOptionModule,
];

@NgModule({
  imports: SBB_AUTOCOMPLETE_EXPORTED_DECLARATIONS,
  exports: SBB_AUTOCOMPLETE_EXPORTED_DECLARATIONS,
})
export class SbbAutocompleteModule {}
