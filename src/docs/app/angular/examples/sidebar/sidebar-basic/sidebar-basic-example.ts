import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbSidebarModule } from '@sbb-esta/lyne-angular/sidebar';

/**
 * @title Basic sidebar
 */
@Component({
  selector: 'sbb-sidebar-basic-example',
  templateUrl: 'sidebar-basic-example.html',
  imports: [SbbSidebarModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarBasicExample {}
