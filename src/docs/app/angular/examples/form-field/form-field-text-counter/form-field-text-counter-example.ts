import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';

/**
 * @title Form-field with textarea and text counter
 * @order 3
 */
@Component({
  selector: 'sbb-form-field-text-counter-example',
  templateUrl: 'form-field-text-counter-example.html',
  imports: [SbbFormFieldModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldTextCounterExample {}
