import { NgModule } from '@angular/core';

import { SbbNavigation } from './navigation/navigation';
import { SbbNavigationButton } from './navigation-button/navigation-button';
import { SbbNavigationLink } from './navigation-link/navigation-link';
import { SbbNavigationList } from './navigation-list/navigation-list';
import { SbbNavigationMarker } from './navigation-marker/navigation-marker';
import { SbbNavigationSection } from './navigation-section/navigation-section';

const EXPORTED_DECLARATIONS = [
  SbbNavigation,
  SbbNavigationButton,
  SbbNavigationLink,
  SbbNavigationList,
  SbbNavigationMarker,
  SbbNavigationSection,
];

@NgModule({
  imports: EXPORTED_DECLARATIONS,
  exports: EXPORTED_DECLARATIONS,
})
export class SbbNavigationModule {}
