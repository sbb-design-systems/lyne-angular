import { NgModule } from '@angular/core';

import { SbbCard } from './card/card';
import { SbbCardBadge } from './card-badge/card-badge';
import { SbbCardButton } from './card-button/card-button';
import { SbbCardLink } from './card-link/card-link';

const EXPORTED_DECLARATIONS = [SbbCard, SbbCardBadge, SbbCardButton, SbbCardLink];

@NgModule({
  imports: EXPORTED_DECLARATIONS,
  exports: EXPORTED_DECLARATIONS,
})
export class SbbCardModule {}
