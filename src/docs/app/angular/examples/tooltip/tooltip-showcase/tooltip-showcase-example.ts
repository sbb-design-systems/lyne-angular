import { Component, signal } from '@angular/core';
import { form, FormField, min } from '@angular/forms/signals';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbSelectModule } from '@sbb-esta/lyne-angular/select';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';
import { SbbTooltipModule } from '@sbb-esta/lyne-angular/tooltip';

/**
 * @title tooltip with configurable properties
 * @order 1
 */
@Component({
  selector: 'sbb-tooltip-showcase-example',
  templateUrl: 'tooltip-showcase-example.html',
  styleUrl: 'tooltip-showcase-example.scss',
  imports: [
    FormField,
    SbbFormFieldModule,
    SbbTitleModule,
    SbbTooltipModule,
    SbbSelectModule,
    SbbButtonModule,
  ],
})
export class TooltipShowcaseExample {
  protected controls = form(
    signal({
      position: null,
      openDelay: 0,
      closeDelay: 0,
    }),
    (schema) => {
      min(schema.openDelay, 0);
      min(schema.closeDelay, 0);
    },
  );
}
