import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';

/**
 * @title Basic form-field
 */
@Component({
  selector: 'sbb-form-field-basic-example',
  templateUrl: 'form-field-basic-example.html',
  imports: [SbbFormFieldModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldBasicExample {}
