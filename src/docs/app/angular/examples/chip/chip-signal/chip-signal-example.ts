import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbChipModule } from '@sbb-esta/lyne-angular/chip';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';

/**
 * @title sbb-chip signal usage
 * @order 4
 */
@Component({
  selector: 'sbb-chip-signal-example',
  templateUrl: 'chip-signal-example.html',
  imports: [FormField, SbbChipModule, SbbFormFieldModule, JsonPipe, SbbCardModule],
})
export class ChipSignalExample {
  protected controls = form(signal({ model: ['Value 1', 'Value 2', 'Value 3'] }));
}
