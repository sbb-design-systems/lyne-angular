import { NgModule } from '@angular/core';

import { SbbError } from './error/error';
import { SbbFormField } from './form-field/form-field';
import { SbbFormFieldClear } from './form-field-clear/form-field-clear';

const SBB_FORM_FIELD_EXPORTED_DECLARATIONS = [SbbFormField, SbbFormFieldClear, SbbError];

@NgModule({
  imports: SBB_FORM_FIELD_EXPORTED_DECLARATIONS,
  exports: SBB_FORM_FIELD_EXPORTED_DECLARATIONS,
})
export class SbbFormFieldModule {}
