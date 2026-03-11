import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbAutocompleteModule } from '@sbb-esta/lyne-angular/autocomplete';

/**
 * @title Basic autocomplete
 */
@Component({
  selector: 'sbb-autocomplete-basic-example',
  templateUrl: 'autocomplete-basic-example.html',
  imports: [SbbAutocompleteModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteBasicExample {}
