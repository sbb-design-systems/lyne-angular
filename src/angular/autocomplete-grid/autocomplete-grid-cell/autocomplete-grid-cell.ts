/* eslint-disable @angular-eslint/directive-selector, @angular-eslint/directive-class-suffix */
import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/autocomplete-grid/autocomplete-grid-cell.js';

@Directive({
  selector: 'sbb-autocomplete-grid-cell',
  standalone: true,
})
export class SbbAutocompleteGridCell {}
