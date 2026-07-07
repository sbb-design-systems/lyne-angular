import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbFileSelectorModule } from '@sbb-esta/lyne-angular/file-selector';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Template-driven form integration
 * @order 5
 */
@Component({
  selector: 'sbb-file-selector-template-driven-example',
  templateUrl: 'file-selector-template-driven-example.html',
  imports: [
    FormField,
    FormsModule,
    JsonPipe,
    SbbCardModule,
    SbbCheckboxModule,
    SbbFileSelectorModule,
    SbbTitleModule,
  ],
})
export class FileSelectorTemplateDrivenExample {
  protected model: File[] = [];

  protected controls = form(
    signal({
      multiple: false,
    }),
  );

  protected stringifiedValue(files: File[]): { name: string; size: number; type: string }[] {
    return files.map((f) => ({ name: f.name, size: f.size, type: f.type }));
  }
}
