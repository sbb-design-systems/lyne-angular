import { Component } from '@angular/core';
import { SbbAutocompleteModule } from '@sbb-esta/lyne-angular/autocomplete';
import { SbbChip, SbbChipModule } from '@sbb-esta/lyne-angular/chip';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';

/**
 * @title  sbb-chip with autocomplete
 * @order 2
 */
@Component({
  selector: 'sbb-chip-autocomplete-example',
  templateUrl: 'chip-autocomplete-example.html',
  imports: [SbbChipModule, SbbFormFieldModule, SbbAutocompleteModule, SbbChip],
})
export class ChipAutocompleteExample {}
