import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbContainerModule } from '@sbb-esta/lyne-angular/container';
import { type SbbHeader, SbbHeaderModule } from '@sbb-esta/lyne-angular/header';
import { SbbLogoModule } from '@sbb-esta/lyne-angular/logo';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Basic header
 */
@Component({
  selector: 'sbb-header-basic-example',
  templateUrl: 'header-basic-example.html',
  imports: [
    FormField,
    SbbCheckboxModule,
    SbbContainerModule,
    SbbHeaderModule,
    SbbLogoModule,
    SbbRadioButtonModule,
    SbbTitleModule,
  ],
})
export class HeaderBasicExample {
  protected controls = form(
    signal({
      expanded: false,
      hideOnScroll: false,
      size: null as SbbHeader['size'],
    }),
  );
}
