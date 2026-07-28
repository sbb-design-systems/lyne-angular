import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { type SbbTag, SbbTagModule } from '@sbb-esta/lyne-angular/tag';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title tag-group with configurable properties
 * @order 1
 */
@Component({
  selector: 'sbb-tag-showcase-example',
  templateUrl: 'tag-showcase-example.html',
  imports: [
    FormField,
    SbbFormFieldModule,
    SbbTagModule,
    SbbTitleModule,
    SbbCheckboxModule,
    SbbRadioButtonModule,
  ],
})
export class TagShowcaseExample {
  protected readonly controls = form(
    signal({
      multiple: false,
      disabled: false,
      size: null as SbbTag['size'],
      amount: '' as SbbTag['amount'],
    }),
  );
}
