import { Component, signal } from '@angular/core';
import { disabled, form, FormField } from '@angular/forms/signals';
import { SbbActionGroupModule } from '@sbb-esta/lyne-angular/action-group';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbSelectModule } from '@sbb-esta/lyne-angular/select';
import { type SbbStepper, SbbStepperModule } from '@sbb-esta/lyne-angular/stepper';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Stepper showcase
 * @order 1
 */
@Component({
  selector: 'sbb-stepper-showcase-example',
  templateUrl: 'stepper-showcase-example.html',
  imports: [
    FormField,
    SbbStepperModule,
    SbbCheckboxModule,
    SbbRadioButtonModule,
    SbbTitleModule,
    SbbFormFieldModule,
    SbbSelectModule,
    SbbButtonModule,
    SbbActionGroupModule,
  ],
})
export class StepperShowcaseExample {
  protected controls = form(
    signal({
      linear: false,
      size: null as SbbStepper['size'],
      horizontalFrom: null as SbbStepper['horizontalFrom'] | null,
      orientation: 'horizontal' as SbbStepper['orientation'],
      stepLabelHasIcon: false,
      stepLabelDisabled: false,
    }),
    (schemaPath) => {
      disabled(schemaPath.horizontalFrom, {
        when: ({ valueOf }) => valueOf(schemaPath.orientation) === 'horizontal',
      });
    },
  );
}
