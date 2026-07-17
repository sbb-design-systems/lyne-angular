import { Component } from '@angular/core';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbSelectModule } from '@sbb-esta/lyne-angular/select';

/**
 * @title select with optgroup and hint
 * @order 2
 */
@Component({
  selector: 'sbb-select-optgroup-example',
  templateUrl: 'select-optgroup-example.html',
  imports: [SbbFormFieldModule, SbbSelectModule],
})
export class SelectOptgroupExample {}
