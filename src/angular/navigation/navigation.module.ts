import { NgModule } from '@angular/core';

import { SbbNavigation } from './navigation/navigation';
import { SbbNavigationButton } from './navigation-button/navigation-button';
import { SbbNavigationCloseDirective } from './navigation-close-directive/navigation-close-directive';
import { SbbNavigationLink } from './navigation-link/navigation-link';
import { SbbNavigationList } from './navigation-list/navigation-list';
import { SbbNavigationMarker } from './navigation-marker/navigation-marker';
import { SbbNavigationSection } from './navigation-section/navigation-section';
import { SbbNavigationSectionCloseDirective } from './navigation-section-close-directive/navigation-section-close-directive';

const SBB_NAVIGATION_EXPORTED_DECLARATIONS = [
  SbbNavigation,
  SbbNavigationButton,
  SbbNavigationCloseDirective,
  SbbNavigationLink,
  SbbNavigationList,
  SbbNavigationMarker,
  SbbNavigationSection,
  SbbNavigationSectionCloseDirective,
];

@NgModule({
  imports: SBB_NAVIGATION_EXPORTED_DECLARATIONS,
  exports: SBB_NAVIGATION_EXPORTED_DECLARATIONS,
})
export class SbbNavigationModule {}
