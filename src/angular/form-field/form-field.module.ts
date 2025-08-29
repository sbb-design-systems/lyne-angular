import { SbbFormError } from '@sbb-esta/lyne-angular/form-error';

import { SbbFormField } from './form-field/form-field';
import { SbbFormFieldClear } from './form-field-clear/form-field-clear';

export const SbbFormFieldModule = [SbbFormField, SbbFormFieldClear, SbbFormError] as const;
