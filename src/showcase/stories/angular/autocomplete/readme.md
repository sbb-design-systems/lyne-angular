This documentation focuses on the Angular features of the `sbb-autocomplete`.
For Lyne elements documentation and API, check the Lyne Elements Storybook on [https://lyne-storybook.app.sbb.ch/?path=/docs/elements-sbb-autocomplete--docs](https://lyne-storybook.app.sbb.ch/?path=/docs/elements-sbb-autocomplete--docs).

On top of the Lyne Elements functionality, the Angular wrapper provides a `SbbAutocompleteTrigger` directive.
This directive to be used if using complex values (other than type string). See the example below on how to connect.

```ts
@Component({
  imports: [SbbAutocomplete, SbbAutocompleteTrigger, ReactiveFormsModule, SbbFormField, SbbOption],
  template: `<sbb-form-field>
    <label for="input">Autocomplete</label>
    <input id="input" [formControl]="control" [sbbAutocomplete]="auto" />
    <sbb-autocomplete [displayWith]="displayWith" #auto="sbbAutocomplete">
      @for (value of values; track value) {
        <sbb-option [value]="value">{{ value.property }}</sbb-option>
      }
    </sbb-autocomplete>
  </sbb-form-field>`,
})
class TestComponentWithComplexValue {
  values = [
    { property: 'value 1', otherProp: 'test' },
    { property: 'value 2', otherProp: 'other test' },
  ];
  autocomplete = viewChild.required(SbbAutocomplete);
  options = viewChildren(SbbOption);
  control = new FormControl(this.values[0]);
  displayWith: ((value: { property: string; otherProperty: string }) => string) | null = (value) =>
    value ? value.property : value;
}
```
