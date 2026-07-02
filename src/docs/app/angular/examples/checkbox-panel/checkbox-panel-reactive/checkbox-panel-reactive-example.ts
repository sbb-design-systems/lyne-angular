import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbCheckboxPanelModule } from '@sbb-esta/lyne-angular/checkbox-panel';
import { SbbIconModule } from '@sbb-esta/lyne-angular/icon';

/**
 * @title sbb-checkbox-panel in a reactive form
 * @order 2
 */
@Component({
  selector: 'sbb-checkbox-panel-reactive-example',
  templateUrl: 'checkbox-panel-reactive-example.html',
  styleUrl: 'checkbox-panel-reactive-example.scss',
  imports: [ReactiveFormsModule, SbbCheckboxPanelModule, SbbCardModule, SbbIconModule],
})
export class CheckboxPanelReactiveExample {
  protected control = new FormControl<boolean | null>(null);
}
