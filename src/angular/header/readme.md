# Header

The `<sbb-header>` component is a container for actions and a logo, and it is displayed at the top of the page.

The header can contain:

- one or more actions with `<sbb-header-button>` or `<sbb-header-link>`
- other action items like [sbb-button](/angular/components/button/overview) or [sbb-link](/angular/components/link/overview)
- a logo or a signet with the `.sbb-header-logo` class (see [sbb-logo](/angular/components/logo/overview))

Slotted elements are aligned to the left. Use a `<div class="sbb-header-spacer"></div>` to align elements
after it to the right.

```html
<sbb-header>
  <sbb-header-link iconName="hamburger-menu-small" href="https://sbb.ch/somewhere">
    Menu
  </sbb-header-link>
  <sbb-header-button iconName="magnifying-glass-small">Search</sbb-header-button>
  <div class="sbb-header-spacer"></div>
  <a aria-label="Homepage" href="/" class="sbb-header-logo">
    <sbb-logo protectiveRoom="none"></sbb-logo>
  </a>
</sbb-header>
```

## Style

Setting the `expanded` property will cause the `<sbb-header>` component to take up the full width of the page.

To avoid that tabbed/focused elements get hidden behind the header,
it's recommended to set on the `<html>` tag the CSS property `scroll-padding-top` to `var(--sbb-header-vertical-spacing)` or to a greater value.
With this, it's ensured that content will be visible all the time.

The component has two sizes `s` and `m`.
For size `s`, the usage of the `<sbb-signet>` with `protective-room='panel'` is suggested.

```html
<sbb-header size="s">
  <sbb-header-link iconName="hamburger-menu-small" href="https://sbb.ch/somewhere">
    Menu
  </sbb-header-link>
  <sbb-header-button iconName="magnifying-glass-small">Search</sbb-header-button>
  <div class="sbb-header-spacer"></div>
  <a aria-label="Homepage" href="/" class="sbb-header-logo">
    <sbb-signet protectiveRoom="panel"></sbb-signet>
  </a>
</sbb-header>
```

### Scroll behavior

By default, the `<sbb-header>` listens to scroll events on the `document`. Whenever the page is
scrolled down, a box-shadow appears beneath the header to visually separate it from the content.

> **Note:** In applications where the page itself does not scroll — such as layouts with an
> [icon sidebar](/angular/components/icon-sidebar/overview) or [sidebar](/angular/components/sidebar/overview) where only the
> content area scrolls — the shadow will never appear unless the correct scroll container is
> configured. Always set a scroll origin in such setups (see below).

#### Hide on scroll

Setting the `hide-on-scroll` attribute causes the header to slide out of view when scrolling down
and reappear when scrolling back up. The box-shadow behavior is retained.

```html
<sbb-header hideOnScroll>
  <sbb-header-button iconName="magnifying-glass-small">Search</sbb-header-button>
  <div class="sbb-header-spacer"></div>
  <a aria-label="Homepage" href="/" class="sbb-header-logo">
    <sbb-logo protectiveRoom="none"></sbb-logo>
  </a>
</sbb-header>
```

#### Scroll origin

By default, the header listens to scroll events on the `document`. To attach the scroll listener to
a different element, use the `scroll-origin` attribute with the `id` of the element, or set the
`scrollOrigin` property directly with an `HTMLElement` reference.

```html
<sbb-header hideOnScroll scrollOrigin="main-content">...</sbb-header>

<div id="main-content" style="overflow: auto;">
  <!-- scrollable page content -->
</div>
```

#### Global scroll origin via `sbb-header-scroll-origin` attribute

As an alternative to the `scroll-origin` property, any element in the page can be designated as the
scroll origin by placing the `sbb-header-scroll-origin` attribute on it. This approach is
particularly powerful in the following scenarios:

- **Micro-frontend or shell architectures** where the header and the scroll container are owned by
  different teams or applications and a direct property binding is not feasible.
- **Router-based applications** where each route renders its own scrollable outlet or sub-component.
  Each routed view can simply add `sbb-header-scroll-origin` to its scroll container on mount and
  remove it on unmount — no reference to the header element is needed.

```html
<sbb-header hideOnScroll>...</sbb-header>
<sbb-icon-sidebar-container>
  <sbb-icon-sidebar color="milk">...</sbb-icon-sidebar>
  <sbb-icon-sidebar-content sbb-header-scroll-origin>
    <sbb-sidebar-container>
      <sbb-sidebar mode="side" opened>...</sbb-sidebar>
      <sbb-sidebar-content sbb-header-scroll-origin>...</sbb-sidebar-content>
    </sbb-sidebar-container>
  </sbb-icon-sidebar-content>
</sbb-icon-sidebar-container>
```

The `<sbb-header>` uses a `MutationObserver` on the document to automatically detect elements
carrying the `sbb-header-scroll-origin` attribute, including those added to or removed from the DOM
after the initial render. The attribute can also be set and removed dynamically at runtime, so
navigating to a new route automatically hands over the scroll origin to the new container without
any explicit coordination with the header.

If multiple elements carry the `sbb-header-scroll-origin` attribute simultaneously, the one that
appears **last in DOM order** is used as the active scroll origin. This includes deeply nested
elements: an element inside a child component will be considered later in DOM order than its
ancestor, and will therefore take priority. In the icon sidebar and sidebar example above,
`sbb-sidebar-content` is a descendant of `sbb-icon-sidebar-content`, so it will always win and
become the active scroll origin — which is exactly the desired behavior.

The `scroll-origin` property takes **priority** over the `sbb-header-scroll-origin` attribute.
When `scroll-origin` is set, it is always used as the active scroll origin regardless of any
elements carrying the `sbb-header-scroll-origin` attribute. The attribute acts as a convenient
fallback for cases where no explicit `scroll-origin` property is provided.

### Customizing

Users can customize position and behavior of actions inside the `<sbb-header>` component
by adding classes to `<sbb-header-button>`/`<sbb-header-link>` elements and then defining their own style rules.

All the examples have the following requirements:

1. four action items (with custom icons);
2. the first item is always left aligned and has `hide-label-below` set to `small`;
3. the other three items are left aligned in breakpoints zero to large, and right aligned from large to ultra;
4. the last item is not visible in breakpoints zero to small;
5. the logo is always aligned to the right.

To achieve the alignment requirements, two `div` tags with a CSS class named `sbb-header-spacer` were added:

- one after the first `<sbb-header-button>` item (that will be hidden on smaller screen sizes);
- the second, before the logo. Since this spacer will only be shown on small screen sizes, we need a new class to target it (in this example `sbb-header-spacer-logo`);

We also need a class (in this example `last-element`) on the last `<sbb-header-button>` to achieve requirement n° 4.

Finally, the following custom CSS has been added(\*).

```css
.last-element,
.sbb-header-spacer-logo {
  display: none;
}

@media screen and (width >= 600px) {
  .last-element {
    display: block;
  }
}

@media screen and (width < 1024px) {
  .sbb-header-spacer {
    display: none;
  }

  .sbb-header-spacer-logo {
    display: block;
  }
}
```

```html
<sbb-header>
  <sbb-header-button iconName="..." hideLabelBelow="small"> ... </sbb-header-button>

  <!-- Will be hidden on small screen sizes -->
  <div class="sbb-header-spacer"></div>

  <sbb-header-button iconName="..."> ... </sbb-header-button>
  <sbb-header-button iconName="..."> ... </sbb-header-button>
  <sbb-header-button iconName="..." class="last-element"> ... </sbb-header-button>

  <!-- Will only be shown on small screen sizes -->
  <div class="sbb-header-spacer sbb-header-spacer-logo"></div>

  <a aria-label="Homepage" href="/" class="sbb-header-logo">
    <sbb-logo protectiveRoom="none"></sbb-logo>
  </a>
</sbb-header>
```

The `<sbb-header>` can be also customized by adding the application's name and version:
a helper class named `sbb-header-info` is provided to achieve the correct visual result.

```html
<sbb-header size="s">
  <sbb-header-link iconName="hamburger-menu-small" href="https://sbb.ch/somewhere">
    Menu
  </sbb-header-link>

  <span class="sbb-header-info">
    <strong>Application name</strong>
    <span>V. 1.1</span>
  </span>

  <div class="sbb-header-spacer"></div>

  <a aria-label="Homepage" href="/" class="sbb-header-logo">
    <sbb-signet protectiveRoom="panel"></sbb-signet>
  </a>
</sbb-header>
```

### Content overflow

If a certain `<sbb-header-button>`/`<sbb-header-link>` should be shrunken (receive ellipsis) when there is too little space,
set the CSS class `sbb-header-shrinkable` on the desired `<sbb-header-button>`/`<sbb-header-link>`.

```html
<sbb-header>
  <sbb-header-link iconName="hamburger-menu-small" href="https://sbb.ch/somewhere" target="_blank">
    Menu
  </sbb-header-link>
  <sbb-header-button class="sbb-header-shrinkable">
    Christina Müller has a long name
  </sbb-header-button>
  <div class="sbb-header-spacer"></div>
  <a aria-label="Homepage" href="/" class="sbb-header-logo">
    <sbb-logo protectiveRoom="none"></sbb-logo>
  </a>
</sbb-header>
```

(\*) Technical note: Due the presence of media-query rules, it was not possible to add those rules directly
in the component's stories (see also [this Storybook issue](https://github.com/storybookjs/storybook/issues/8820)),
so they were wrapped into a `style` tag and added to the Storybook's configuration file named `preview-head.html`.

## Header Actions

There are two types of header actions: links and buttons, represented by the `<sbb-header-link>`
and `<sbb-header-button>` components respectively.

```html
<sbb-header-link href="#info" target="_blank">Link</sbb-header-link>
<sbb-header-button>Button</sbb-header-button>
```

The components can optionally display an `<sbb-icon>` at the component start using the `iconName`
property or via custom content using the `icon` slot.

```html
<sbb-header-link href="#info" iconName="pie-small">Another text</sbb-header-link>
<sbb-header-button><sbb-icon slot="icon" name="pie-small" />Another text</sbb-header-button>
```

If the component's icon and label are set, the property `hideLabelBelow` can be used to define the maximum (not including) breakpoint
to which the label is displayed. Below that breakpoint, only the icon is visible.
Without an icon, the label is always displayed and the property is ignored.

```html
<sbb-header-link href="#" hideLabelBelow="large" iconName="pie-small">Text</sbb-header-link>
<sbb-header-button hideLabelBelow="large" iconName="pie-small">Text</sbb-header-button>
```

To indicate an active state, the CSS class `sbb-active` should be used.

From accessibility perspective `accessibility-current="page"` should be set whenever the CSS class `sbb-active` is set.

```html
<sbb-header-link
  iconName="magnifying-glass-small"
  href="#"
  class="sbb-active"
  accessibilityCurrent="page"
>
  Overview
</sbb-header-link>
```

### Avatar image

By slotting an `img` or a `<sbb-image>` into the `icon`-slot, an avatar style icon will be displayed,
and it's possible to place a `sbb-badge` on it. However, for the `img`-elements it's not possible to directly
place a `sbb-badge` on it. In this case, use a wrapping `<figure>` element.

```html
<figure sbb-badge="5" class="sbb-figure" slot="icon">
  <img
    src="..."
    alt="Avatar Icon"
    class="sbb-image-border-radius-round"
    style="width: var(--sbb-size-icon-ui-small); height: var(--sbb-size-icon-ui-small);"
  />
</figure>
```

## Header Environment

The `<sbb-header-environment>` component displays a ribbon inside the header to indicate the current environment.

**Note**: For the production environment, the sbb-header-environment is expected to be hidden.

```html
<sbb-header>
  ...
  <sbb-header-environment>dev</sbb-header-environment>
</sbb-header>
```

We provide default colors for `dev`, `edu`, `int`, `loc` and `test`. Any other environment is by default of
color granite.

It is possible to override the ribbon background color by overriding the
`--sbb-header-environment-background-color` CSS variable.
Furthermore, the `--sbb-header-environment-color` variable can be used change the text color.

```scss
sbb-header-environment {
  --sbb-header-environment-background-color: custom-color;
}
```

## @sbb-esta/lyne-elements Docs

[Link to related @sbb-esta/lyne-elements docs](https://lyne-elements.app.sbb.ch/?path=/docs/elements-header--docs)
