import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbButton } from '@sbb-esta/lyne-angular/button/button';
import { SbbDividerModule } from '@sbb-esta/lyne-angular/divider';
import { SbbMenuModule } from '@sbb-esta/lyne-angular/menu';

/**
 * @title Basic menu
 */
@Component({
  selector: 'sbb-menu-basic-example',
  templateUrl: 'menu-basic-example.html',
  imports: [SbbMenuModule, SbbButton, SbbDividerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuBasicExample {}
