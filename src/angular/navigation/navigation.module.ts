import { NgModule } from '@angular/core';
import { SbbFocusInitial } from '@sbb-esta/lyne-angular/core/overlay';

import { SbbNavigation } from './navigation/navigation';
import { SbbNavigationButton } from './navigation-button/navigation-button';
import { SbbNavigationClose } from './navigation-close/navigation-close';
import { SbbNavigationLink } from './navigation-link/navigation-link';
import { SbbNavigationList } from './navigation-list/navigation-list';
import { SbbNavigationMarker } from './navigation-marker/navigation-marker';
import { SbbNavigationSection } from './navigation-section/navigation-section';
import { SbbNavigationSectionClose } from './navigation-section-close/navigation-section-close';

const SBB_NAVIGATION_EXPORTED_DECLARATIONS = [
  SbbNavigation,
  SbbNavigationButton,
  SbbNavigationClose,
  SbbNavigationLink,
  SbbNavigationList,
  SbbNavigationMarker,
  SbbNavigationSection,
  SbbNavigationSectionClose,
  SbbFocusInitial,
];

@NgModule({
  imports: SBB_NAVIGATION_EXPORTED_DECLARATIONS,
  exports: SBB_NAVIGATION_EXPORTED_DECLARATIONS,
})
export class SbbNavigationModule {}
