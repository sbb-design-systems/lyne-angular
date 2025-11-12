import { KeyValuePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field';
import { SbbHeader, SbbHeaderLink } from '@sbb-esta/lyne-angular/header';
import { SbbLogo } from '@sbb-esta/lyne-angular/logo';
import { SbbOption } from '@sbb-esta/lyne-angular/option';
import { SbbSelect } from '@sbb-esta/lyne-angular/select';
import { SbbSidebarModule } from '@sbb-esta/lyne-angular/sidebar';
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
    SbbSidebarModule,
    SbbTooltipDirective,
  ],
  providers: [VariantSwitch],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private _variantSwitch = inject(VariantSwitch);
  sbbVariant = this._variantSwitch.sbbVariant;
  packages = PACKAGES;
}
