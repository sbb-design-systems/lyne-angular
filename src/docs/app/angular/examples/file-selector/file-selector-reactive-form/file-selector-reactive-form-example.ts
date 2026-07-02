import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbFileSelectorModule } from '@sbb-esta/lyne-angular/file-selector';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Reactive form integration
 * @order 3
 */
@Component({
  selector: 'sbb-file-selector-reactive-form-example',
  templateUrl: 'file-selector-reactive-form-example.html',
  imports: [
    FormField,
    JsonPipe,
    ReactiveFormsModule,
    SbbCardModule,
    SbbCheckboxModule,
    SbbFileSelectorModule,
    SbbTitleModule,
  ],
})
export class FileSelectorReactiveFormExample {
  protected control = new FormControl<File[]>([], { nonNullable: true });

  protected controls = form(
    signal({
      multiple: false,
    }),
  );

  protected stringifiedValue(files: File[]): { name: string; size: number; type: string }[] {
    return files.map((f) => ({ name: f.name, size: f.size, type: f.type }));
  }
}
