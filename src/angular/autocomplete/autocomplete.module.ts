import { SbbOptionModule } from '@sbb-esta/lyne-angular/option';

import { SbbAutocomplete } from './autocomplete';
import { SbbAutocompleteTrigger } from './autocomplete-trigger';

export const SbbAutocompleteModule = [
  SbbAutocompleteTrigger,
  SbbAutocomplete,
  SbbOptionModule,
] as const;
