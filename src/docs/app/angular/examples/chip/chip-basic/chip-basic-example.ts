import { Component } from '@angular/core';
import { SbbChipModule } from '@sbb-esta/lyne-angular/chip';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';

/**
 * @title Basic chip
 */
@Component({
  selector: 'sbb-chip-basic-example',
  templateUrl: 'chip-basic-example.html',
  imports: [SbbChipModule, SbbFormFieldModule],
})
export class ChipBasicExample {}
