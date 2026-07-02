import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { form, FormField } from '@angular/forms/signals';
import { SbbAutocompleteModule } from '@sbb-esta/lyne-angular/autocomplete';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';

/**
 * @title sbb-autocomplete with sbb-optgroup and sbb-option-hint
 * @order 3
 */
@Component({
  selector: 'sbb-autocomplete-hint-optgroup-example',
  templateUrl: 'autocomplete-hint-optgroup-example.html',
  imports: [SbbAutocompleteModule, SbbCardModule, SbbFormFieldModule, JsonPipe, FormField],
})
export class AutocompleteHintOptgroupExample {
  private readonly options: string[] = [
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
  protected control = form(signal('one'));
  protected readonly staticOptions: string[] = ['static one', 'static two', 'static three'];

  protected readonly filteredOptions = toSignal(
    toObservable(this.control().value).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map((newValue) =>
        !newValue || newValue.length < 2
          ? []
          : this.options.filter(
              (option) => option.toLocaleUpperCase().indexOf(newValue.toLocaleUpperCase()) > -1,
            ),
      ),
    ),
  );
}
