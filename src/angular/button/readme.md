# Button

<!-- keywords: form -->

The button components from Lyne provide the same functionality as a native `<button>` element
enhanced with SBB Design, accepting its associated properties (`type`, `name`, `value` and `form`).

```html
<sbb-button>Button text</sbb-button>
<sbb-secondary-button>Button text</sbb-secondary-button>
<sbb-accent-button>Button text</sbb-accent-button>
<sbb-transparent-button>Button text</sbb-transparent-button>
```

For every variant there is also a link version, equivalent to a native `anchor (a)` element.

```html
<sbb-button-link>Button text</sbb-button-link>
<sbb-secondary-button-link>Button text</sbb-secondary-button-link>
<sbb-accent-button-link>Button text</sbb-accent-button-link>
<sbb-transparent-button-link>Button text</sbb-transparent-button-link>
```

Additionally, for every variant there is a static version that can be used inside another
interactive element (e.g. an `anchor (a)`).

```html
<sbb-button-static>Button text</sbb-button-static>
<sbb-secondary-button-static>Button text</sbb-secondary-button-static>
<sbb-accent-button-static>Button text</sbb-accent-button-static>
<sbb-transparent-button-static>Button text</sbb-transparent-button-static>
```

There is also a mini button variant, which can be used for specific contexts, such as inside
a `<sbb-form-field>`.

```html
<sbb-mini-button>Button text</sbb-mini-button>
<sbb-mini-button-link>Button text</sbb-mini-button-link>
```

Each button component can optionally display an `<sbb-icon>` at the component start
using the `iconName` property or via custom content using the `icon` slot.
All button usages must either provide text content, an icon (for icon only) or both.

```html
<!-- Buttons with both icon and text -->
<sbb-button iconName="info">Button text</sbb-button>

<sbb-button>
  <sbb-icon slot="icon" name="info"></sbb-icon>
  Button text
</sbb-button>

<!-- Buttons with only an icon -->
<sbb-button iconName="info" aria-label="Click for more information."></sbb-button>
```

## Style

The component has a negative variant which can be set using the `negative` property.

There are different sizes (except for the mini-button), `s`, `m` and `l`,
that can be set using the `size` property.

The component can be displayed in `disabled` state using the corresponding property.

```html
<sbb-button negative>Button</sbb-button>

<sbb-button size="l">Button</sbb-button>

<sbb-button disabled>Button</sbb-button>
```

### Loading state

The button components (except for the mini-button) can be configured into a
loading state using the `loading` property.
This should be done by listening to the `click` event on the button and setting
the loading property to `true` e.g. when waiting for a response from the server.
After receiving the response, the property should be set back to `false`.
The loading state will be animated after a delay of 300ms, which can be configured with the
`--sbb-button-loading-delay` CSS variable.

<!-- #region override loading-example -->

```html
<sbb-button (click)="markAsLoading()"> Button </sbb-button>
```

```ts
@Component({
  selector: 'example',
  templateUrl: './example.html',
})
export class Example {
  button = viewChild.required(SbbButton);

  markAsLoading() {
    this.button().loading = true;
    setTimeout(() => (this.button().loading = false), 4000);
  }
}
```

<!-- #endregion -->

### Focus outline

Please make sure that the focus outline appears in the correct color if the component is used on a dark background.
You can set it by re-defining the CSS var on `<sbb-button>` or any parent element:

```css
sbb-button {
  --sbb-focus-outline-color: var(--sbb-focus-outline-color-dark);
}
```

## CSS classes

As an alternative to the custom elements, the button design can be applied to a native
`<button>` or `<a>` element by using CSS classes. This can be useful whenever the
markup has to stay a native element.

The classes are part of the global styles, so they are available as soon as the theme
is imported.

```html
<button class="sbb-button">Button text</button>
<a class="sbb-secondary-button" href="https://www.sbb.ch">Link text</a>
```

### Variants and sizes

Every variant is available as a base class, which uses the size defined by the theme
(`m` in the standard theme, `s` in the lean theme), and with an explicit size suffix.

| Variant     | Theme default            | Size `s`                   | Size `m`                   | Size `l`                   |
| ----------- | ------------------------ | -------------------------- | -------------------------- | -------------------------- |
| Primary     | `sbb-button`             | `sbb-button-s`             | `sbb-button-m`             | `sbb-button-l`             |
| Secondary   | `sbb-secondary-button`   | `sbb-secondary-button-s`   | `sbb-secondary-button-m`   | `sbb-secondary-button-l`   |
| Accent      | `sbb-accent-button`      | `sbb-accent-button-s`      | `sbb-accent-button-m`      | `sbb-accent-button-l`      |
| Transparent | `sbb-transparent-button` | `sbb-transparent-button-s` | `sbb-transparent-button-m` | `sbb-transparent-button-l` |

### Modifiers

| Class                      | Equivalent property   | Description                                                                   |
| -------------------------- | --------------------- | ----------------------------------------------------------------------------- |
| `sbb-negative`             | `negative`            | Negative variant.                                                             |
| `sbb-icon-button`          | icon-only usage       | Renders the button as a square, icon only button.                             |
| `sbb-loading`              | `loading`             | Loading state, see below.                                                     |
| `sbb-disabled-interactive` | `disabledInteractive` | Disabled appearance, while the element stays focusable and dispatches events. |
| `sbb-button-label`         | –                     | Inner element which truncates overflowing text, see limitations below.        |
| `sbb-hover`                | –                     | Forces the hover appearance, e.g. for documentation or testing purposes.      |

The disabled state is read from the native `disabled` attribute, so no extra class is needed.
As an alternative to the classes, the `loading` and `disabled-interactive` attributes can be
used as well.

```html
<button class="sbb-button-l sbb-negative">Button text</button>

<button class="sbb-button" disabled>Button text</button>

<button class="sbb-transparent-button sbb-icon-button" aria-label="Click for more information.">
  <sbb-icon name="info"></sbb-icon>
</button>
```

Unlike the components, the icon is not resolved from a property. Place an `<sbb-icon>` (or any
other content) directly inside the element; the spacing between icon and text is applied
automatically.

### Loading state

The loading state is enabled with the `sbb-loading` class (or the `loading` attribute).
As with the components, the animation kicks in after a delay of 300ms, configurable with the
`--sbb-button-loading-delay` CSS variable.

Because there is no component logic involved, the accessibility state has to be provided
manually, and the consumer is responsible for preventing further interaction while loading.

```html
<button class="sbb-button sbb-loading" aria-busy="true" aria-disabled="true">Button text</button>
```

### Limitations

Compared to the components, the CSS classes only provide the styling. Keep the following
differences in mind:

- **Text truncation requires an additional element.** The components truncate an overflowing
  label automatically. With the CSS classes, the label has to be wrapped in a direct child
  carrying the `sbb-button-label` class, otherwise long text is not truncated:

  ```html
  <button class="sbb-button">
    <span class="sbb-button-label">A very long button text that should be truncated</span>
  </button>
  ```

- **Accessibility attributes are not managed.** `aria-busy` and `aria-disabled` have to be set
  manually for the loading and the disabled interactive state.
- **No icon property.** Icons have to be placed as child elements.

## Accessibility

Use the accessibility properties in case of an icon-only button to describe the purpose of the `<sbb-button>` for screen-reader users.

### Interactive disabled buttons

Native disabled elements cannot receive focus and do not dispatch any events. This can
be problematic in some cases because it can prevent the app from telling the user why the button is
disabled. Consumers can use the `disabledInteractive` property to style the button as disabled but allow for
it to receive focus and dispatch events. The button will have `aria-disabled="true"` for assistive
technology. It is the consumers responsibility to provide a reason for the element being disabled.
This can be achieved by adding an `aria-label`, `aria-labelledby` or `aria-describedby` attribute.

**Note:** Using the `disabledInteractive` property can result in buttons that previously prevented
actions to no longer do so, for example a submit button in a form. When using this input, you should
guard against such cases in your component.

## Mini Button Group

The `<sbb-mini-button-group>` component displays a set of `<sbb-mini-button>`
optionally separated by a [sbb-divider](/angular/components/divider/overview).

```html
<sbb-mini-button-group accessibilityLabel="My group">
  <sbb-mini-button iconName="..." aria-label="..."></sbb-mini-button>
  <sbb-mini-button iconName="..." aria-label="..."></sbb-mini-button>
  <sbb-divider orientation="vertical"></sbb-divider>
  <sbb-mini-button iconName="..." aria-label="..."></sbb-mini-button>
</sbb-mini-button-group>
```

### Style

The component has a negative variant which can be set using the `negative` property.

There are four available sizes: `s`, `m`, `l` and `xl`.

```html
<sbb-mini-button-group negative size="l"> ... </sbb-mini-button-group>
```

### Accessibility

Use the `accessibility-label` property to describe the purpose of the `<sbb-mini-button-group>` for screen-reader users.

If `<sbb-divider>` components are used as separators, their `aria-hidden` property is automatically set to `true`
to ensure that the button list is read by screen readers with the correct size.

## Docs on @sbb-esta/lyne-elements

[Link to related @sbb-esta/lyne-elements docs](https://lyne-elements.app.sbb.ch/?path=/docs/elements-button--docs)
