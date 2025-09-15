import { NgModule } from '@angular/core';

import { SbbTag } from './tag/tag';
import { SbbTagGroup } from './tag-group/tag-group';

const EXPORTED_DECLARATIONS = [SbbTag, SbbTagGroup];

@NgModule({
  imports: EXPORTED_DECLARATIONS,
  exports: EXPORTED_DECLARATIONS,
})
export class SbbTagModule {}
