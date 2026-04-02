import { NgModule } from '@angular/core';

import { SbbError } from './error/error';
import { SbbFormField } from './form-field/form-field';
import { SbbFormFieldClear } from './form-field-clear/form-field-clear';
import { SbbFormFieldTextCounter } from './form-field-text-counter/form-field-text-counter';
import { SbbHint } from './hint/hint';

const SBB_FORM_FIELD_EXPORTED_DECLARATIONS = [
  SbbError,
  SbbFormField,
  SbbFormFieldClear,
  SbbFormFieldTextCounter,
  SbbHint,
];

@NgModule({
  imports: SBB_FORM_FIELD_EXPORTED_DECLARATIONS,
  exports: SBB_FORM_FIELD_EXPORTED_DECLARATIONS,
})
export class SbbFormFieldModule {}
