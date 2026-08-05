import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbToggleCheckModule } from '@sbb-esta/lyne-angular/toggle-check';

/**
 * @title Toggle check in a reactive form
 * @order 3
 */
@Component({
  selector: 'sbb-toggle-check-reactive-example',
  templateUrl: 'toggle-check-reactive-example.html',
  imports: [SbbToggleCheckModule, ReactiveFormsModule, SbbCardModule],
})
export class ToggleCheckReactiveExample {
  protected control = new FormControl(false);
}
