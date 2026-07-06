import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title links with configurable properties
 * @order 1
 */
@Component({
  selector: 'sbb-link-showcase-example',
  templateUrl: 'link-showcase-example.html',
  imports: [FormField, SbbCheckboxModule, SbbFormFieldModule, SbbLinkModule, SbbTitleModule],
})
export class LinkShowcaseExample {
  protected controls = form(signal({ disabled: false }));
}
