import { NgModule } from '@angular/core';

import { SbbAutocomplete } from './autocomplete';
import { SbbAutocompleteTrigger } from './autocomplete-trigger';

const EXPORTED_DECLARATIONS = [SbbAutocompleteTrigger, SbbAutocomplete];

@NgModule({
  imports: EXPORTED_DECLARATIONS,
  exports: EXPORTED_DECLARATIONS,
})
export class SbbAutocompleteModule {}
