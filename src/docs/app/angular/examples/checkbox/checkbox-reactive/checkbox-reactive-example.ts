import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';

/**
 * @title Checkbox in a reactive form
 * @order 3
 */
@Component({
  selector: 'sbb-checkbox-reactive-example',
  templateUrl: 'checkbox-reactive-example.html',
  imports: [SbbCheckboxModule, ReactiveFormsModule, SbbCardModule],
})
export class CheckboxReactiveExample {
  protected control = new FormControl<boolean | null>(null);
}
