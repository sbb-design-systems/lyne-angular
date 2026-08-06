import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbChipModule } from '@sbb-esta/lyne-angular/chip';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';

/**
 * @title sbb-chip template driven usage
 * @order 6
 */
@Component({
  selector: 'sbb-chip-template-driven-example',
  templateUrl: 'chip-template-driven-example.html',
  imports: [FormsModule, SbbChipModule, SbbFormFieldModule, JsonPipe, SbbCardModule],
})
export class ChipTemplateDrivenExample {
  protected model = ['Value 1', 'Value 2', 'Value 3'];
}
