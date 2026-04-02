import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbNavigationModule } from '@sbb-esta/lyne-angular/navigation';

/**
 * @title Basic navigation
 */
@Component({
  selector: 'sbb-navigation-basic-example',
  templateUrl: 'navigation-basic-example.html',
  imports: [SbbNavigationModule, SbbButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationBasicExample {}
