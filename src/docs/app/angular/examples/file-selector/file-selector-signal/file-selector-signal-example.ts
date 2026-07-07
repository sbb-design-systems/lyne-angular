import { JsonPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbFileSelectorModule } from '@sbb-esta/lyne-angular/file-selector';

/**
 * @title Signal form integration
 * @order 3
 */
@Component({
  selector: 'sbb-file-selector-signal-example',
  templateUrl: 'file-selector-signal-example.html',
  imports: [FormField, JsonPipe, SbbCardModule, SbbFileSelectorModule],
})
export class FileSelectorSignalExample {
  protected form = form(signal<{ fileSelector: File[] }>({ fileSelector: [] }));

  protected stringifiedValue = computed(() => {
    const value = this.form.fileSelector().value();
    return value.map((f) => ({ name: f.name, size: f.size, type: f.type }));
  });
}
