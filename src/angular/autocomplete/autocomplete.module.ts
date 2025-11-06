import { NgModule } from '@angular/core';
import { SbbOptionModule } from '@sbb-esta/lyne-angular/option';

import { SbbAutocomplete } from './autocomplete';
import { SbbAutocompleteTrigger } from './autocomplete-trigger';

const SBB_AUTOCOMPLETE_EXPORTED_DECLARATIONS = [
  SbbAutocompleteTrigger,
  SbbAutocomplete,
  SbbOptionModule,
];

@NgModule({
  imports: SBB_AUTOCOMPLETE_EXPORTED_DECLARATIONS,
  exports: SBB_AUTOCOMPLETE_EXPORTED_DECLARATIONS,
})
export class SbbAutocompleteModule {}
