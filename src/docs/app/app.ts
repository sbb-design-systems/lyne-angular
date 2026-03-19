import { KeyValuePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field';
import { SbbHeader, SbbHeaderButton, SbbHeaderLink } from '@sbb-esta/lyne-angular/header';
import { SbbIconSidebarModule } from '@sbb-esta/lyne-angular/icon-sidebar';
import { SbbLogo } from '@sbb-esta/lyne-angular/logo';
import { SbbOption } from '@sbb-esta/lyne-angular/option';
import { SbbSelect } from '@sbb-esta/lyne-angular/select';
import { SbbTooltipDirective } from '@sbb-esta/lyne-angular/tooltip';

import { LightDarkController } from './light-dark-controller';
import { PACKAGES } from './shared/meta';
import { ScrollOrigin } from './shared/scroll-origin';
import { ScrollOriginRegistrar } from './shared/scroll-origin-registrar';
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
    SbbSelect,
    SbbOption,
    SbbFormField,
    KeyValuePipe,
    RouterLinkActive,
    SbbIconSidebarModule,
    SbbTooltipDirective,
    SbbHeaderButton,
    ScrollOriginRegistrar,
  ],
  providers: [VariantSwitch],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  #variantSwitch = inject(VariantSwitch);
  sbbVariant = this.#variantSwitch.sbbVariant;
  packages = PACKAGES;
  version = inject(Meta).getTag('name="sbb-lyne-angular-version"')?.content ?? 'unknown version';
  lightDarkController = inject(LightDarkController);
  scrollOrigin = inject(ScrollOrigin).scrollOrigin;
}
