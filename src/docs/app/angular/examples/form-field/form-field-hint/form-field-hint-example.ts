import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';

/**
 * @title Form-field with hint
 * @order 4
 */
@Component({
  selector: 'sbb-form-field-hint-example',
  templateUrl: 'form-field-hint-example.html',
  imports: [SbbFormFieldModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldHintExample {}
