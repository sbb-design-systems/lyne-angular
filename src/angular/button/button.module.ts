import { NgModule } from '@angular/core';

import { SbbAccentButton } from './accent-button/accent-button';
import { SbbAccentButtonLink } from './accent-button-link/accent-button-link';
import { SbbAccentButtonStatic } from './accent-button-static/accent-button-static';
import { SbbButton } from './button/button';
import { SbbButtonLink } from './button-link/button-link';
import { SbbButtonStatic } from './button-static/button-static';
import { SbbMiniButton } from './mini-button/mini-button';
import { SbbMiniButtonGroup } from './mini-button-group/mini-button-group';
import { SbbMiniButtonLink } from './mini-button-link/mini-button-link';
import { SbbSecondaryButton } from './secondary-button/secondary-button';
import { SbbSecondaryButtonLink } from './secondary-button-link/secondary-button-link';
import { SbbSecondaryButtonStatic } from './secondary-button-static/secondary-button-static';
import { SbbTransparentButton } from './transparent-button/transparent-button';
import { SbbTransparentButtonLink } from './transparent-button-link/transparent-button-link';
import { SbbTransparentButtonStatic } from './transparent-button-static/transparent-button-static';

const SBB_BUTTON_EXPORTED_DECLARATIONS = [
  SbbAccentButton,
  SbbAccentButtonLink,
  SbbAccentButtonStatic,
  SbbButton,
  SbbButtonLink,
  SbbButtonStatic,
  SbbMiniButton,
  SbbMiniButtonGroup,
  SbbMiniButtonLink,
  SbbSecondaryButton,
  SbbSecondaryButtonLink,
  SbbSecondaryButtonStatic,
  SbbTransparentButton,
  SbbTransparentButtonLink,
  SbbTransparentButtonStatic,
];

@NgModule({
  imports: SBB_BUTTON_EXPORTED_DECLARATIONS,
  exports: SBB_BUTTON_EXPORTED_DECLARATIONS,
})
export class SbbButtonModule {}
