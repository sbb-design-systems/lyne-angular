import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { type SbbTitle, SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title title with configurable properties
 */
@Component({
  selector: 'sbb-title-basic-example',
  templateUrl: 'title-showcase-example.html',
  imports: [FormField, SbbTitleModule, SbbRadioButtonModule, SbbCheckboxModule],
})
export class TitleShowcaseExample {
  protected readonly controls = form(
    signal({
      negative: false,
      level: '2' as SbbTitle['level'],
      visualLevel: null as SbbTitle['visualLevel'],
    }),
  );
}
