import { KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SbbDivider } from '@sbb-esta/lyne-angular/divider';
import { SbbHeaderModule } from '@sbb-esta/lyne-angular/header';
import { SbbIconSidebarModule } from '@sbb-esta/lyne-angular/icon-sidebar';
import { SbbLogo } from '@sbb-esta/lyne-angular/logo';
import { SbbMenuModule } from '@sbb-esta/lyne-angular/menu';
import { SbbSignet } from '@sbb-esta/lyne-angular/signet';
import { SbbTooltipDirective } from '@sbb-esta/lyne-angular/tooltip';

import { LightDarkController } from './light-dark-controller';
import { PACKAGES } from './shared/meta';
import { SidebarToggle } from './shared/package-viewer/sidebar-toggle';
import { ThemeController } from './theme-controller';

@Component({
  selector: 'sbb-app',
  imports: [
    KeyValuePipe,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    SbbDivider,
    SbbHeaderModule,
    SbbIconSidebarModule,
    SbbLogo,
    SbbMenuModule,
    SbbSignet,
    SbbTooltipDirective,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  themeController = inject(ThemeController);
  lightDarkController = inject(LightDarkController);
  packages = PACKAGES;
  version = inject(Meta).getTag('name="sbb-lyne-angular-version"')?.content ?? 'unknown version';
  sidebarToggle = inject(SidebarToggle);
}
