The `<sbb-footer>` component is used to display page related information like copyright, contact or other
content related links; for these, the [sbb-link-list](/docs/elements-link-list--docs) component can be used.

## Variants

There are two variants of the footer: the `variant='default'`, which displays the slotted content in regular
block element approach and the `variant='clock-columns'`, which uses a CSS-grid for displaying the content over different
breakpoints.

**Note:**
Content, like `<sbb-link-list>` that could come along with a button, needs to be wrapped with a `<div>` element with a helper
class (`class="sbb-link-list-button-group"`) to be displayed correctly.

```html
<!-- 'default' variant -->
<sbb-footer accessibilityTitle="Footer">
  <sbb-link-list titleLevel="2" titleContent="List title text">
    <sbb-block-link href="#">Link 1</sbb-block-link>
    <sbb-block-link href="#">Link 2</sbb-block-link>
    <sbb-block-link href="#">Link 3</sbb-block-link>
    <sbb-block-link href="#">Link 4</sbb-block-link>
    <sbb-block-link href="#">Link 5</sbb-block-link>
  </sbb-link-list>
</sbb-footer>

<!--'clock-columns' variant -->
<sbb-footer accessibilityTitle="Footer" variant="clock-columns">
  <div class="sbb-link-list-button-group">
    <sbb-link-list titleLevel="2" titleContent="Help &amp; Contact.">
      <sbb-block-link href="#">Refunds</sbb-block-link>
      <sbb-block-link href="#">Lost property office</sbb-block-link>
      <sbb-block-link href="#">Complaints</sbb-block-link>
      <sbb-block-link href="#">Praise</sbb-block-link>
      <sbb-block-link href="#">Report property damage</sbb-block-link>
    </sbb-link-list>
    <sbb-button-link>All help topics</sbb-button-link>
  </div>
  <sbb-link-list titleLevel="2" titleContent="More SBB.">
    <sbb-block-link href="#">Jobs & careers</sbb-block-link>
    <sbb-block-link href="#">Rail traffic information</sbb-block-link>
    <sbb-block-link href="#">SBB News</sbb-block-link>
    <sbb-block-link href="#">SBB Community</sbb-block-link>
    <sbb-block-link href="#">Company</sbb-block-link>
  </sbb-link-list>
  ...
  <sbb-divider></sbb-divider>
  <sbb-link-list size="xs" horizontalFrom="large">
    <sbb-block-link href="#">Refunds</sbb-block-link>
    <sbb-block-link href="#">Lost property office</sbb-block-link>
    <sbb-block-link href="#">Complaints</sbb-block-link>
    <sbb-block-link href="#">Praise</sbb-block-link>
    <sbb-block-link href="#">Report property damage</sbb-block-link>
  </sbb-link-list>
</sbb-footer>
```

## Style

It's possible to display the footer in `negative` variant; please also apply the negative attribute
to the content where needed (e.g. `<sbb-link-list>`, `<sbb-link>` and `<sbb-divider>`).

```html
<sbb-footer negative accessibilityTitle="Footer">
  <sbb-link-list negative titleLevel="2" titleContent="Help &amp; Contact.">
    <sbb-block-link negative href="#">Refunds</sbb-block-link>
    <sbb-block-link negative href="#">Lost property office</sbb-block-link>
    <sbb-block-link negative href="#">Complaints</sbb-block-link>
    <sbb-block-link negative href="#">Praise</sbb-block-link>
    <sbb-block-link negative href="#">Report property damage</sbb-block-link>
  </sbb-link-list>
</sbb-footer>
```
