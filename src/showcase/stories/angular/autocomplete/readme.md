This documentation focuses on the Angular features of the `sbb-autocomplete`.
For Lyne elements documentation and API, check the Lyne Elements Storybook on [https://lyne-storybook.app.sbb.ch/?path=/docs/elements-sbb-autocomplete--docs](https://lyne-storybook.app.sbb.ch/?path=/docs/elements-sbb-autocomplete--docs).

On top of the Lyne Elements functionality, the Angular wrapper provides a `SbbAutocompleteTrigger` directive.
This directive is meant to be used if using complex values (other than type string). See the example below on how to connect.

## Complex Values

### `displayWith` function

When using complex values, the selection should most likely still be represented as text.
To achieve this, you can use the `displayWith` property which accepts a function.
This function receives the selected value and should return a string.

Please note that the parameter is the assigned value of the selected option which does not necessarily
align with the type information.

Additionally, when using Angular Forms, the initially passed value of `displayWith` can be `null`.
