import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbDividerModule } from '@sbb-esta/lyne-angular/divider';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Basic divider
 * @order 1
 */
@Component({
  selector: 'sbb-divider-basic-example',
  templateUrl: 'divider-basic-example.html',
  styleUrl: 'divider-basic-example.scss',
  imports: [FormField, SbbCheckboxModule, SbbDividerModule, SbbTitleModule],
})
export class DividerBasicExample {
  protected controls = form(
    signal({
      negative: false,
    }),
  );
}
