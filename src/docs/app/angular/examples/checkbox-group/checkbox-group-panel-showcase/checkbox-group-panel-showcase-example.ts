import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { type SbbCheckboxGroup } from '@sbb-esta/lyne-angular/checkbox-group';
import { SbbCheckboxPanelModule } from '@sbb-esta/lyne-angular/checkbox-panel';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbIconModule } from '@sbb-esta/lyne-angular/icon';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbSelectModule } from '@sbb-esta/lyne-angular/select';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title checkbox-group with checkbox-panel
 * @order 2
 */
@Component({
  selector: 'sbb-checkbox-group-panel-showcase-example',
  templateUrl: 'checkbox-group-panel-showcase-example.html',
  styleUrl: 'checkbox-group-panel-showcase-example.scss',
  imports: [
    SbbCheckboxModule,
    SbbCheckboxPanelModule,
    SbbTitleModule,
    FormField,
    SbbRadioButtonModule,
    SbbSelectModule,
    SbbFormFieldModule,
    SbbCardModule,
    SbbIconModule,
  ],
})
export class CheckboxGroupPanelShowcaseExample {
  protected controls = form(
    signal({
      orientation: 'horizontal' as SbbCheckboxGroup['orientation'],
      size: null as SbbCheckboxGroup['size'],
      horizontalFrom: null as SbbCheckboxGroup['horizontalFrom'] | null,
    }),
  );
}
