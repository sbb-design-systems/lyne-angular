import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import type { SbbDownload } from '@sbb-esta/lyne-angular/download';
import { SbbDownloadModule } from '@sbb-esta/lyne-angular/download';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title <component name> with configurable properties
 */
@Component({
  selector: 'sbb-download-showcase-example',
  templateUrl: 'download-showcase-example.html',
  imports: [
    // remove unused modules
    FormField,
    SbbCheckboxModule,
    SbbFormFieldModule,
    SbbRadioButtonModule,
    SbbTitleModule,
    SbbDownloadModule,
  ],
})
export class DownloadShowcaseExample {
  protected controls = form(
    signal({
      color: 'white' as SbbDownload['color'],
      label: '',
      href: 'https://www.sbb.ch/anual-report.pdf',
    }),
  );
}
