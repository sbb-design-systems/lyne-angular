import { Component } from '@angular/core';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbLinkListModule } from '@sbb-esta/lyne-angular/link-list';
import { SbbSidebarModule } from '@sbb-esta/lyne-angular/sidebar';

/**
 * @title Basic sidebar
 */
@Component({
  selector: 'sbb-sidebar-basic-example',
  templateUrl: 'sidebar-basic-example.html',
  styleUrl: 'sidebar-basic-example.scss',
  imports: [SbbSidebarModule, SbbLinkListModule, SbbLinkModule],
})
export class SidebarBasicExample {}
