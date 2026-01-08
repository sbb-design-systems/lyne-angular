import { KeyValuePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field';
import { SbbHeader, SbbHeaderLink } from '@sbb-esta/lyne-angular/header';
import { SbbIconSidebarModule } from '@sbb-esta/lyne-angular/icon-sidebar';
import { SbbLogo } from '@sbb-esta/lyne-angular/logo';
import { SbbOption } from '@sbb-esta/lyne-angular/option';
import { SbbSelect } from '@sbb-esta/lyne-angular/select';
import { SbbTooltipDirective } from '@sbb-esta/lyne-angular/tooltip';

import { PACKAGES } from './shared/meta';
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
  ],
  providers: [VariantSwitch],
  templateUrl: './app.html',
})
export class App {
  #variantSwitch = inject(VariantSwitch);
  sbbVariant = this.#variantSwitch.sbbVariant;
  packages = PACKAGES;
  version = inject(Meta).getTag('name="sbb-lyne-angular-version"')!.content;
}
