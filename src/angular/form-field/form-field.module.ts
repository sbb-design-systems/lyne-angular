import { NgModule } from '@angular/core';
import { SbbFormError } from '@sbb-esta/lyne-angular/form-error';

import { SbbFormField } from './form-field/form-field';
import { SbbFormFieldClear } from './form-field-clear/form-field-clear';

const SBB_FORM_FIELD_EXPORTED_DECLARATIONS = [SbbFormField, SbbFormFieldClear, SbbFormError];

@NgModule({
  imports: SBB_FORM_FIELD_EXPORTED_DECLARATIONS,
  exports: SBB_FORM_FIELD_EXPORTED_DECLARATIONS,
})
export class SbbFormFieldModule {}
