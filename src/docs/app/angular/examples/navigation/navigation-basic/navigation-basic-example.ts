import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbNavigationModule } from '@sbb-esta/lyne-angular/navigation';

/**
 * @title Basic navigation
 */
@Component({
  selector: 'sbb-navigation-basic-example',
  templateUrl: 'navigation-basic-example.html',
  imports: [SbbNavigationModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationBasicExample {}
