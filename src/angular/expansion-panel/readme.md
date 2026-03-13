The `<sbb-expansion-panel>` is a component which acts as an expandable summary-details widget.

It can be used standalone or inside an [sbb-accordion](/docs/elements-accordion--docs).

In order to correctly display the component, it must be used together with
the `<sbb-expansion-panel-header>` and `<sbb-expansion-panel-content>` components.
The header will work as a state controller, the content will act as the expandable content.

```html
<sbb-expansion-panel>
  <sbb-expansion-panel-header>This is the header.</sbb-expansion-panel-header>
  <sbb-expansion-panel-content>This is the content.</sbb-expansion-panel-content>
</sbb-expansion-panel>
```

The `<sbb-expansion-panel-header>` component is internally rendered as a button, and it is possible to
provide text via an unnamed slot.
On the left side, a toggle icon is displayed; it flips based on the host's `aria-expanded` property.

The component can optionally display a `<sbb-icon>` at the component start using the `iconName`
property or via custom content using the `icon` slot.
If using the SBB icons, the icon should be a medium size icon.

```html
<sbb-expansion-panel-header iconName="swisspass-medium">Header</sbb-expansion-panel-header>
```

<!-- #region override intro-end -->

## Lazy Loading

On top of the Lyne Elements functionality, the Angular wrapper provides a `SbbExpansionPanelContentDirective` for lazy loading content.
By default, the expansion panel contents are eagerly loaded. Eagerly loaded panels will initialize the child components but not inject them into the DOM until the panel is expanded.

If the expansion panel contains several complex child components or the panel's contents rely on DOM calculations during initialization, it is advised to lazy load the panel's content.

Expansion panel contents can be lazy loaded by declaring the body in a ng-template with the `sbbExpansionPanelContent` attribute inside the `sbb-expansion-panel-content` component.

```ts
@Component({
  imports: [SbbExpansionPanelModule],
  template: `
    <sbb-expansion-panel>
      <sbb-expansion-panel-header>Header</sbb-expansion-panel-header>
      <sbb-expansion-panel-content>
        <ng-template sbbExpansionPanelContent>
          <!-- This content will only be loaded when the panel is opened -->
          <my-heavy-component></my-heavy-component>
        </ng-template>
      </sbb-expansion-panel-content>
    </sbb-expansion-panel>
  `,
})
class ExpansionPanelComponent {}
```

The lazy loaded content will only be instantiated and rendered when the expansion panel is opened for the first time. This can significantly improve initial page load performance when you have multiple expansion panels with heavy content.

<!-- #endregion -->

## States

The visibility of the content is controlled by the value of the `expanded` property.

```html
<sbb-expansion-panel expanded> ... </sbb-expansion-panel>
```

The `disabled` state can be set using the self-named variable. In this state, the component can not be collapsed or expanded.

```html
<sbb-expansion-panel disabled> ... </sbb-expansion-panel>
```

## Events

The `<sbb-expansion-panel-header>` element dispatches the `toggleexpanded` event when clicked.

## Style

The component has two background options (`milk` and `white`, which is the default) that can be set using the `color` variable.

```html
<sbb-expansion-panel color="milk"> ... </sbb-expansion-panel>
```

The component has two different sizes, `l` (default) and `s`, which can be changed using the `size` property.
The property is overridden when the component is used within a `<sbb-accordion>`.

```html
<sbb-expansion-panel size="s"> ... </sbb-expansion-panel>
```

It's also possible to display the `<sbb-expansion-panel>` without border by setting the `borderless` variable.

```html
<sbb-expansion-panel borderless> ... </sbb-expansion-panel>
```

Using the `titleLevel` variable, it's possible to wrap the `<sbb-expansion-panel-header>` in a heading tag;
if it's unset, a `<div>` is used as a wrapper.

```html
<sbb-expansion-panel level="4">
  <sbb-expansion-panel-header
    >This is the header, and it will be wrapped in a h4 tag.</sbb-expansion-panel-header
  >
  <sbb-expansion-panel-content>This is the content.</sbb-expansion-panel-content>
</sbb-expansion-panel>
```

## Accessibility

The `<sbb-expansion-panel-header>` and `<sbb-expansion-panel-content>` are automatically connected
via `aria-controls` and `aria-labelledby` when placed inside an `<sbb-expansion-panel>`.

The `expanded` attribute is used to correctly set the `aria-expanded` attribute on the header
and the `aria-hidden` attribute on the content.
