import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import {
  type SbbLoadingIndicator,
  SbbLoadingIndicatorModule,
} from '@sbb-esta/lyne-angular/loading-indicator';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title loading-indicator showcase
 */
@Component({
  selector: 'sbb-loading-indicator-showcase-example',
  templateUrl: 'loading-indicator-showcase-example.html',
  imports: [FormField, SbbLoadingIndicatorModule, SbbRadioButtonModule, SbbTitleModule],
})
export class LoadingIndicatorShowcaseExample {
  protected controls = form(
    signal({
      size: 's' as SbbLoadingIndicator['size'],
      color: 'default' as SbbLoadingIndicator['color'],
    }),
  );
}
