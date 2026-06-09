import { Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbIconModule } from '@sbb-esta/lyne-angular/icon';
import { SbbTooltipModule } from '@sbb-esta/lyne-angular/tooltip';

/**
 * @title Form-field with prefix icon and suffix mini button
 * @order 6
 */
@Component({
  selector: 'sbb-form-field-prefix-suffix-example',
  templateUrl: 'form-field-prefix-suffix-example.html',
  imports: [SbbButtonModule, SbbFormFieldModule, SbbIconModule, SbbTooltipModule],
})
export class FormFieldPrefixSuffixExample {}
