import { Component, signal } from '@angular/core';
import { form, FormField, min } from '@angular/forms/signals';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
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
    SbbButtonModule,
    SbbCheckboxModule,
    SbbFormFieldModule,
    SbbSelectModule,
    SbbTitleModule,
    SbbTooltipModule,
  ],
})
export class TooltipShowcaseExample {
  protected controls = form(
    signal({
      position: null,
      openDelay: 0,
      closeDelay: 0,
      disabled: false,
    }),
    (schema) => {
      min(schema.openDelay, 0);
      min(schema.closeDelay, 0);
    },
  );
}
