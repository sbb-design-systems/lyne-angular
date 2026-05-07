import type { KeyValue } from '@angular/common';
import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SbbAutocompleteModule } from '@sbb-esta/lyne-angular/autocomplete';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { map } from 'rxjs/operators';

/**
 * @title sbb-autocomplete with async reactive form and key-value options mapping
 */
@Component({
  selector: 'sbb-autocomplete-reactive-example',
  templateUrl: 'autocomplete-reactive-example.html',
  styleUrl: 'autocomplete-reactive-example.scss',
  imports: [
    SbbAutocompleteModule,
    SbbCardModule,
    SbbFormFieldModule,
    JsonPipe,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteReactiveExample {
  readonly #options: KeyValue<string, number>[] = [
    { key: 'First value', value: 1 },
    { key: 'Second value', value: 2 },
    { key: 'Third value', value: 3 },
  ];
  protected control = new FormControl<KeyValue<string, number> | string | null>(null);
  protected displayWith: (v: KeyValue<string, number>) => string = (
    v: KeyValue<string, number>,
  ): string => (v ? v.key : v);
  protected filteredOptions = toSignal(
    this.control.valueChanges.pipe(
      map((value) => {
        const name = typeof value === 'string' ? value : value?.key;
        return name ? this.#filter(name) : this.#options.slice(0);
      }),
    ),
  );

  #filter(key: string): KeyValue<string, number>[] {
    const filterValue = key.toLowerCase();
    return this.#options.filter((opt) => opt.key.toLowerCase().toLowerCase().includes(filterValue));
  }
}
