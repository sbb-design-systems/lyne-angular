/* eslint-disable @angular-eslint/directive-selector */
import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/autocomplete-grid/autocomplete-grid-cell.js';

@Directive({
  selector: 'sbb-autocomplete-grid-cell',
  standalone: true,
})
export class SbbAutocompleteGridCellDirective {}