import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbAutocompleteGridModule } from '@sbb-esta/lyne-angular-experimental/autocomplete-grid';

/**
 * @title Basic autocomplete-grid
 */
@Component({
  selector: 'sbb-autocomplete-grid-basic-example',
  templateUrl: 'autocomplete-grid-basic-example.html',
  imports: [SbbAutocompleteGridModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteGridBasicExample {}
