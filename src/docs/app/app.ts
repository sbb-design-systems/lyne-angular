import { KeyValuePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  SbbHeader,
  SbbHeaderButton,
  SbbHeaderLink,
  SbbHeaderScrollOrigin,
} from '@sbb-esta/lyne-angular/header';
import { SbbIconSidebarModule } from '@sbb-esta/lyne-angular/icon-sidebar';
import { SbbLogo } from '@sbb-esta/lyne-angular/logo';
import { SbbMenuModule } from '@sbb-esta/lyne-angular/menu';
import { SbbTooltipDirective } from '@sbb-esta/lyne-angular/tooltip';

import { LightDarkController } from './light-dark-controller';
import { PACKAGES } from './shared/meta';
import type { SbbVariant } from './variant-switch';
import { VariantSwitch } from './variant-switch';

@Component({
  selector: 'sbb-app',
  imports: [
    SbbHeader,
    SbbHeaderLink,
    SbbLogo,
    RouterLink,
    RouterOutlet,
    ReactiveFormsModule,
    KeyValuePipe,
    RouterLinkActive,
    SbbIconSidebarModule,
    SbbTooltipDirective,
    SbbHeaderButton,
    SbbMenuModule,
    SbbHeaderScrollOrigin,
  ],
  providers: [VariantSwitch],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  variantSwitch = inject(VariantSwitch);
  variants = Object.entries(this.variantSwitch.themes) as [SbbVariant, string][];
  packages = PACKAGES;
  version = inject(Meta).getTag('name="sbb-lyne-angular-version"')?.content ?? 'unknown version';
  lightDarkController = inject(LightDarkController);
}
