import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { type SbbPaginator, SbbPaginatorModule } from '@sbb-esta/lyne-angular/paginator';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title <component name> with configurable properties
 * @order 1
 */
@Component({
  selector: 'sbb-paginator-showcase-example',
  templateUrl: 'paginator-showcase-example.html',
  imports: [
    FormField,
    SbbCheckboxModule,
    SbbFormFieldModule,
    SbbPaginatorModule,
    SbbRadioButtonModule,
    SbbTitleModule,
  ],
})
export class PaginatorShowcaseExample {
  protected controls = form(
    signal({
      negative: false,
      disabled: false,
      size: null as SbbPaginator['size'],
      pagerPosition: 'start' as SbbPaginator['pagerPosition'],
    }),
  );
}
