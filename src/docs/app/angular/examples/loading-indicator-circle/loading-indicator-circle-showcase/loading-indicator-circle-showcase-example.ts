import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import {
  type SbbLoadingIndicatorCircle,
  SbbLoadingIndicatorCircleModule,
} from '@sbb-esta/lyne-angular/loading-indicator-circle';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title loading-indicator-circle showcase
 */
@Component({
  selector: 'sbb-loading-indicator-circle-showcase-example',
  templateUrl: 'loading-indicator-circle-showcase-example.html',
  imports: [FormField, SbbLoadingIndicatorCircleModule, SbbRadioButtonModule, SbbTitleModule],
})
export class LoadingIndicatorCircleShowcaseExample {
  protected controls = form(
    signal({
      color: 'default' as SbbLoadingIndicatorCircle['color'],
    }),
  );
}
