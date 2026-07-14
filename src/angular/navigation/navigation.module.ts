import { NgModule } from '@angular/core';
import { SbbFocusInitial } from '@sbb-esta/lyne-angular/core';

import { SbbNavigation } from './navigation/navigation';
import { SbbNavigationTrigger } from './navigation/navigation-trigger';
import { SbbNavigationButton } from './navigation-button/navigation-button';
import { SbbNavigationClose } from './navigation-close/navigation-close';
import { SbbNavigationLink } from './navigation-link/navigation-link';
import { SbbNavigationList } from './navigation-list/navigation-list';
import { SbbNavigationMarker } from './navigation-marker/navigation-marker';
import { SbbNavigationSection } from './navigation-section/navigation-section';
import { SbbNavigationSectionTrigger } from './navigation-section/navigation-section-trigger';
import { SbbNavigationSectionClose } from './navigation-section-close/navigation-section-close';

const SBB_NAVIGATION_EXPORTED_DECLARATIONS = [
  SbbNavigation,
  SbbNavigationTrigger,
  SbbNavigationButton,
  SbbNavigationClose,
  SbbNavigationLink,
  SbbNavigationList,
  SbbNavigationMarker,
  SbbNavigationSection,
  SbbNavigationSectionTrigger,
  SbbNavigationSectionClose,
  SbbFocusInitial,
];

@NgModule({
  imports: SBB_NAVIGATION_EXPORTED_DECLARATIONS,
  exports: SBB_NAVIGATION_EXPORTED_DECLARATIONS,
})
export class SbbNavigationModule {}
