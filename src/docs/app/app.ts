import { KeyValuePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SbbContainer } from '@sbb-esta/lyne-angular/container/container';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field';
import { SbbHeader, SbbHeaderLink } from '@sbb-esta/lyne-angular/header';
import { SbbBlockLink } from '@sbb-esta/lyne-angular/link/block-link';
import { SbbLinkList } from '@sbb-esta/lyne-angular/link-list/link-list';
import { SbbLogo } from '@sbb-esta/lyne-angular/logo';
import { SbbOption } from '@sbb-esta/lyne-angular/option';
import { SbbSelect } from '@sbb-esta/lyne-angular/select';
import { SbbSidebarModule } from '@sbb-esta/lyne-angular/sidebar';

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
    SbbContainer,
    KeyValuePipe,
    RouterLinkActive,
    SbbSidebarModule,
    SbbLinkList,
    SbbBlockLink,
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
