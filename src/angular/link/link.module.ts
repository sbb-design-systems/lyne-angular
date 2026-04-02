import { NgModule } from '@angular/core';

import { SbbBlockLink } from './block-link/block-link';
import { SbbBlockLinkButton } from './block-link-button/block-link-button';
import { SbbBlockLinkStatic } from './block-link-static/block-link-static';
import { SbbLink } from './link/link';
import { SbbLinkButton } from './link-button/link-button';
import { SbbLinkStatic } from './link-static/link-static';

const SBB_LINK_EXPORTED_DECLARATIONS = [
  SbbBlockLink,
  SbbBlockLinkButton,
  SbbBlockLinkStatic,
  SbbLink,
  SbbLinkButton,
  SbbLinkStatic,
];

@NgModule({
  imports: SBB_LINK_EXPORTED_DECLARATIONS,
  exports: SBB_LINK_EXPORTED_DECLARATIONS,
})
export class SbbLinkModule {}
