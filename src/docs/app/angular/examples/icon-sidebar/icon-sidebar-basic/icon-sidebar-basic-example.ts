import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbIconSidebarModule } from '@sbb-esta/lyne-angular/icon-sidebar';
import { SbbTooltipDirective } from '@sbb-esta/lyne-angular/tooltip';

/**
 * @title Basic icon-sidebar
 */
@Component({
  selector: 'sbb-icon-sidebar-basic-example',
  templateUrl: 'icon-sidebar-basic-example.html',
  imports: [SbbIconSidebarModule, SbbTooltipDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconSidebarBasicExample {}
