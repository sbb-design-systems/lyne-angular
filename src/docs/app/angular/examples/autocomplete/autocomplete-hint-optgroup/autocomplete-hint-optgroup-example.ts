import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SbbAutocompleteModule } from '@sbb-esta/lyne-angular/autocomplete';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * @title sbb-autocomplete with sbb-optgroup and sbb-option-hint
 */
@Component({
  selector: 'sbb-autocomplete-hint-optgroup-example',
  templateUrl: 'autocomplete-hint-optgroup-example.html',
  styleUrl: 'autocomplete-hint-optgroup-example.scss',
  imports: [
    SbbAutocompleteModule,
    SbbCardModule,
    SbbFormFieldModule,
    JsonPipe,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteHintOptgroupExample {
  readonly #options: string[] = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
    'twenty ',
    'twenty one',
    'twenty two',
    'twenty three',
    'twenty four',
    'twenty five',
    'twenty six',
    'twenty seven',
    'twenty eight',
    'twenty nine',
  ];
  protected control = new FormControl('one');
  protected readonly staticOptions: string[] = ['static one', 'static two', 'static three'];
  protected readonly filteredOptions = toSignal(
    this.control.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map((newValue) =>
        !newValue || newValue.length < 2
          ? []
          : this.#options.filter(
              (option) => option.toLocaleUpperCase().indexOf(newValue.toLocaleUpperCase()) > -1,
            ),
      ),
    ),
  );
}
