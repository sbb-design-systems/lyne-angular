import { NgModule } from '@angular/core';

import { SbbFormField } from './form-field/form-field';
import { SbbFormFieldClear } from './form-field-clear/form-field-clear';

const EXPORTED_DECLARATIONS = [SbbFormField, SbbFormFieldClear];

@NgModule({
  imports: EXPORTED_DECLARATIONS,
  exports: EXPORTED_DECLARATIONS,
})
export class SbbFormFieldModule {}
