import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbSecondaryButton } from '@sbb-esta/lyne-angular/button/secondary-button';
import { SbbNavigationModule } from '@sbb-esta/lyne-angular/navigation';
import { SbbOverlay } from '@sbb-esta/lyne-angular/overlay';

/**
 * @title Basic navigation
 */
@Component({
  selector: 'sbb-navigation-basic-example',
  templateUrl: 'navigation-basic-example.html',
  imports: [SbbNavigationModule, SbbOverlay, SbbSecondaryButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationBasicExample {}
