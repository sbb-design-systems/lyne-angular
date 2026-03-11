import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbMenuModule } from '@sbb-esta/lyne-angular/menu';

/**
 * @title Basic menu
 */
@Component({
  selector: 'sbb-menu-basic-example',
  templateUrl: 'menu-basic-example.html',
  imports: [SbbMenuModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuBasicExample {}
