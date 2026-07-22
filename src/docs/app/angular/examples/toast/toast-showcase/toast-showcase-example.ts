import { Component, signal, viewChild } from '@angular/core';
import { form, FormField, min } from '@angular/forms/signals';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbSelectModule } from '@sbb-esta/lyne-angular/select';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';
import { SbbToast, SbbToastModule } from '@sbb-esta/lyne-angular/toast';

/**
 * @title toast with configurable properties
 */
@Component({
  selector: 'sbb-toast-showcase-example',
  templateUrl: 'toast-showcase-example.html',
  imports: [
    FormField,
    SbbFormFieldModule,
    SbbToastModule,
    SbbButtonModule,
    SbbTitleModule,
    SbbCheckboxModule,
    SbbSelectModule,
  ],
})
export class ToastShowcaseExample {
  protected readonly controls = form(
    signal({
      position: 'bottom-center' as SbbToast['position'],
      readonly: false,
      timeout: 0,
      withIcon: false,
    }),
    (s) => {
      min(s.timeout, 0);
    },
  );
  protected toast = viewChild.required(SbbToast);

  openToast(): void {
    this.toast().open();
  }
}
