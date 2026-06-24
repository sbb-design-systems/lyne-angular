import { KeyValuePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SbbDividerModule } from '@sbb-esta/lyne-angular/divider';
import { SbbHeaderModule } from '@sbb-esta/lyne-angular/header';
import { SbbIconSidebarModule } from '@sbb-esta/lyne-angular/icon-sidebar';
import { SbbLogoModule } from '@sbb-esta/lyne-angular/logo';
import { SbbMenuModule } from '@sbb-esta/lyne-angular/menu';
import { SbbSignetModule } from '@sbb-esta/lyne-angular/signet';
import { SbbTooltipModule } from '@sbb-esta/lyne-angular/tooltip';

import { LightDarkController } from './light-dark-controller';
import { PACKAGES } from './shared/meta';
import { SidebarToggle } from './shared/package-viewer/sidebar-toggle';
import { ThemeController } from './theme-controller';
import { VersionSelectorComponent } from './version-selector/version-selector';

@Component({
  selector: 'sbb-app',
  imports: [
    KeyValuePipe,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    SbbDividerModule,
    SbbHeaderModule,
    SbbIconSidebarModule,
    SbbLogoModule,
    SbbMenuModule,
    SbbSignetModule,
    SbbTooltipModule,
    VersionSelectorComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected themeController = inject(ThemeController);
  protected lightDarkController = inject(LightDarkController);
  protected sidebarToggle = inject(SidebarToggle);
  protected packages = PACKAGES;
  protected isDev =
    window.location.hostname === 'localhost' ||
    window.location.hostname.split('.')[0]?.endsWith('-dev');
}
