import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbContainerModule } from '@sbb-esta/lyne-angular/container';
import { SbbHeaderModule } from '@sbb-esta/lyne-angular/header';
import { SbbLogoModule } from '@sbb-esta/lyne-angular/logo';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Header environment
 * @order 2
 */
@Component({
  selector: 'sbb-header-environment-example',
  templateUrl: 'header-environment-example.html',
  imports: [
    FormField,
    SbbCardModule,
    SbbContainerModule,
    SbbHeaderModule,
    SbbLogoModule,
    SbbRadioButtonModule,
    SbbTitleModule,
  ],
  host: {
    class: 'fullscreen-example',
  },
})
export class HeaderEnvironmentExample {
  protected controls = form(
    signal({
      environment: 'dev' as 'dev' | 'edu' | 'int' | 'loc' | 'test',
    }),
  );
}
