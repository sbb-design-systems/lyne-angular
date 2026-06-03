# Getting Started

> ⓘ The full introduction including some guides can be retrieved at [@sbb-esta/lyne-elements documentation](https://lyne-elements.app.sbb.ch).

## Automatic installation

1.  Install Angular CLI, see [Angular CLI documentation](https://cli.angular.io/)
2.  Add the `@sbb-esta/lyne-elements` package to your project

    ```sh
      ng add @sbb-esta/lyne-elements
    ```

3.  Follow instructions in the terminal to complete the setup.

## Manual installation

1.  Install Angular CLI, see [Angular CLI documentation](https://cli.angular.io/)
2.  Install the `@sbb-esta/lyne-angular`, `@sbb-esta/lyne-elements` and `@angular/cdk` packages:

    ```sh
      npm install --save @sbb-esta/lyne-angular @sbb-esta/lyne-elements @angular/cdk
    ```

    or, if using yarn:

    ```sh
      yarn add @sbb-esta/lyne-angular @sbb-esta/lyne-elements @angular/cdk
    ```

3.  Including global styles is strongly recommended to apply all SBB styles to your application.
    Importing stylesheets is doable by editing the `styles.(s)css`:

    ```css
    @import 'node_modules/@sbb-esta/lyne-elements/standard-theme.css';
    ```

    or editing your `angular.json`:

    ```json
      ...
      "styles": [
        "src/styles.scss",
        "node_modules/@sbb-esta/lyne-elements/standard-theme.css"
      ],
      ...
    ```

## Import and use Lyne components

Use the desired Lyne components in your Angular components:

- Add Lyne components to the `imports` array in the `@Component` decorator.
- Unlike `lyne-elements`, inputs must be used in `camelCase` (check the `iconName` property in the following example).

### Example

```ts
import { Component, input } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';

@Component({
  selector: 'my-app-example',
  imports: [SbbButtonModule],
  template: `
    <sbb-button [iconName]="iconName()" (click)="logger($event)">
      {{ label() }}
    </sbb-button>
  `,
})
export class ExampleComponent {
  label = input('Button label');
  iconName = input('pie-small');

  protected logger(e: Event) {
    console.log(e);
  }
}
```
