import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbToggleModule } from '@sbb-esta/lyne-angular/toggle';

/**
 * @title sbb-toggle with reactive forms
 * @order 3
 */
@Component({
  selector: 'sbb-toggle-reactive-example',
  templateUrl: 'toggle-reactive-example.html',
  imports: [SbbToggleModule, SbbCardModule, ReactiveFormsModule],
})
export class ToggleReactiveExample {
  protected control = new FormControl('Bern');
}
