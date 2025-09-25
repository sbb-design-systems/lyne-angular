import { NgModule } from '@angular/core';
import { SbbOptionModule } from '@sbb-esta/lyne-angular/option';

import { SbbAutocomplete } from './autocomplete';
import { SbbAutocompleteTrigger } from './autocomplete-trigger';

const EXPORTED_DECLARATIONS = [SbbAutocompleteTrigger, SbbAutocomplete, SbbOptionModule];

@NgModule({
  imports: EXPORTED_DECLARATIONS,
  exports: EXPORTED_DECLARATIONS,
})
export class SbbAutocompleteModule {}
