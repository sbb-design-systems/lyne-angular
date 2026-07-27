import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbSelectModule } from '@sbb-esta/lyne-angular/select';

/**
 * @title Select in a reactive form
 * @order 11
 */
@Component({
  selector: 'sbb-select-reactive-example',
  templateUrl: 'select-reactive-example.html',
  imports: [ReactiveFormsModule, SbbCardModule, SbbFormFieldModule, SbbSelectModule],
})
export class SelectReactiveExample {
  protected control = new FormControl<string | null>(null);
}
