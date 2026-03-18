The `<sbb-selection-action-panel>` component wraps either a [sbb-checkbox-panel](/angular/components/checkbox-panel/overview)
or a [sbb-radio-button-panel](/angular/components/radio-button-panel/overview) and an action element (e.g. an `<sbb-secondary-button>` or a native `button`).

```html
<sbb-selection-action-panel>
  <sbb-radio-button-panel>
    Value
    <span slot="subtext">Subtext</span>
  </sbb-radio-button-panel>

  <!-- action -->
  <sbb-secondary-button iconName="arrow-right-small">...</sbb-secondary-button>
  <!-- or -->
  <button class="sbb-action">...</button>
</sbb-selection-action-panel>
```

## With expansion panel

It is possible to combine the usage of the `<sbb-selection-action-panel>` and the [sbb-selection-expansion-panel](/angular/components/selection-expansion-panel/overview).

```html
<sbb-selection-expansion-panel>
  <sbb-selection-action-panel>
    <sbb-radio-button-panel color="milk" borderless>
      Value
      <span slot="subtext">Subtext</span>
    </sbb-radio-button-panel>

    <sbb-secondary-button iconName="arrow-right-small">...</sbb-secondary-button>
  </sbb-selection-action-panel>

  <!-- inner content -->
  <div slot="content">Inner Content</div>
</sbb-selection-expansion-panel>
```

## In a group

The selection panel can also be used inside a [sbb-radio-button-group](/angular/components/radio-button-group/overview)
or a [sbb-checkbox-group](/angular/components/checkbox-group/overview).

With `<sbb-radio-button-group>`:

```html
<sbb-radio-button-group>
  <sbb-selection-action-panel>
    <sbb-radio-button-panel>
      Value
      <span slot="subtext">Subtext</span>
    </sbb-radio-button-panel>
    <sbb-secondary-button iconName="arrow-right-small"></sbb-secondary-button>
    <sbb-card-badge>%</sbb-card-badge>
  </sbb-selection-action-panel>
  ...
</sbb-radio-button-group>
```

With `<sbb-checkbox-group>`:

```html
<sbb-checkbox-group>
  <sbb-selection-action-panel>
    <sbb-checkbox-panel>
      Value
      <span slot="subtext">Subtext</span>
    </sbb-checkbox-panel>
    <sbb-secondary-button iconName="arrow-right-small"></sbb-secondary-button>
    <sbb-card-badge>%</sbb-card-badge>
  </sbb-selection-action-panel>
  ...
</sbb-checkbox-group>
```

## Style

The component inherits its style from the slotted panel component (`<sbb-checkbox-panel>` or `<sbb-radio-button-panel>`).
