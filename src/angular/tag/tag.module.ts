import { NgModule } from '@angular/core';

import { SbbTag } from './tag/tag';
import { SbbTagGroup } from './tag-group/tag-group';

const SBB_TAG_EXPORTED_DECLARATIONS = [SbbTag, SbbTagGroup];

@NgModule({
  imports: SBB_TAG_EXPORTED_DECLARATIONS,
  exports: SBB_TAG_EXPORTED_DECLARATIONS,
})
export class SbbTagModule {}
