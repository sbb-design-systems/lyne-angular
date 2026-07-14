import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbOptionModule } from '@sbb-esta/lyne-angular/option';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title sbb-option showcase
 * @order 1
 */
@Component({
  selector: 'sbb-option-showcase-example',
  templateUrl: 'option-showcase-example.html',
  imports: [FormField, SbbCheckboxModule, SbbOptionModule, SbbTitleModule],
})
export class OptionShowcaseExample {
  protected controls = form(
    signal({
      disabled: false,
    }),
  );
}
