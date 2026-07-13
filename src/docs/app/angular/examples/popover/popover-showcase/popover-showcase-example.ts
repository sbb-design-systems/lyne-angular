import { Component, signal } from '@angular/core';
import { disabled, form, FormField } from '@angular/forms/signals';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbPopoverModule } from '@sbb-esta/lyne-angular/popover';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title <sbb-popover> showcase
 * @order 1
 */
@Component({
  selector: 'sbb-popover-showcase-example',
  templateUrl: 'popover-showcase-example.html',
  styleUrl: 'popover-showcase-example.scss',
  imports: [
    FormField,
    SbbButtonModule,
    SbbCheckboxModule,
    SbbFormFieldModule,
    SbbPopoverModule,
    SbbRadioButtonModule,
    SbbTitleModule,
  ],
})
export class PopoverShowcaseExample {
  protected controls = form(
    signal({
      hoverTrigger: false,
      hideCloseButton: false,
      openDelay: 0,
      closeDelay: 0,
    }),
    (schemaPath) => {
      disabled(schemaPath.openDelay, {
        when: ({ valueOf }) => !valueOf(schemaPath.hoverTrigger),
      });
      disabled(schemaPath.closeDelay, {
        when: ({ valueOf }) => !valueOf(schemaPath.hoverTrigger),
      });
    },
  );
}
