import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbChipModule } from '@sbb-esta/lyne-angular/chip';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';

/**
 * @title sbb-chip reactive forms usage
 * @order 5
 */
@Component({
  selector: 'sbb-chip-reactive-example',
  templateUrl: 'chip-reactive-example.html',
  imports: [ReactiveFormsModule, SbbChipModule, SbbFormFieldModule, JsonPipe, SbbCardModule],
})
export class ChipReactiveExample {
  protected formControl = new FormControl(['Value 1', 'Value 2', 'Value 3']);
}
