import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbSelectModule } from '@sbb-esta/lyne-angular/select';

/**
 * @title Select with signal forms
 * @order 10
 */
@Component({
  selector: 'sbb-select-signal-example',
  templateUrl: 'select-signal-example.html',
  imports: [FormField, SbbCardModule, SbbFormFieldModule, SbbSelectModule],
})
export class SelectSignalExample {
  protected readonly form = form(signal({ select: null as string | null }));
}
