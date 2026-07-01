import { JsonPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { disabled, form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import type { SbbFileSelectorDropzone } from '@sbb-esta/lyne-angular/file-selector';
import { SbbFileSelectorModule } from '@sbb-esta/lyne-angular/file-selector';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Basic file-selector dropzone
 * @order 2
 */
@Component({
  selector: 'sbb-file-selector-dropzone-example',
  templateUrl: 'file-selector-dropzone-example.html',
  imports: [
    FormField,
    JsonPipe,
    SbbCardModule,
    SbbCheckboxModule,
    SbbFileSelectorModule,
    SbbRadioButtonModule,
    SbbTitleModule,
  ],
})
export class FileSelectorDropzoneExample {
  protected form = form(signal<{ fileSelector: File[] }>({ fileSelector: [] }), (schema) => {
    disabled(schema.fileSelector, { when: () => this.controls.disabled().value() });
  });

  protected controls = form(
    signal({
      disabled: false,
      multiple: false,
      multipleMode: 'default' as SbbFileSelectorDropzone['multipleMode'],
      size: null as SbbFileSelectorDropzone['size'],
      accept: null as string | null,
    }),
    (schemaPath) => {
      disabled(schemaPath.multipleMode, { when: ({ valueOf }) => !valueOf(schemaPath.multiple) });
    },
  );

  protected stringifiedValue = computed(() => {
    const value = this.form.fileSelector().value();
    return value.map((f) => ({ name: f.name, size: f.size, type: f.type }));
  });
}
