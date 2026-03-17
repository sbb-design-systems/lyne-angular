import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbBlockLink } from '@sbb-esta/lyne-angular/link/block-link';
import { SbbLinkListModule } from '@sbb-esta/lyne-angular/link-list';
import { SbbSidebarModule } from '@sbb-esta/lyne-angular/sidebar';

/**
 * @title Basic sidebar
 */
@Component({
  selector: 'sbb-sidebar-basic-example',
  templateUrl: 'sidebar-basic-example.html',
  imports: [SbbSidebarModule, SbbLinkListModule, SbbBlockLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarBasicExample {}
