import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbBadgeModule } from '@sbb-esta/lyne-angular/badge';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbDividerModule } from '@sbb-esta/lyne-angular/divider';
import { SbbMenuModule } from '@sbb-esta/lyne-angular/menu';

/**
 * @title Basic menu
 */
@Component({
  selector: 'sbb-menu-basic-example',
  templateUrl: 'menu-basic-example.html',
  imports: [SbbMenuModule, SbbButtonModule, SbbDividerModule, SbbBadgeModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuBasicExample {}
