This documentation focuses on the Angular features of the `sbb-expansion-panel`.
For Lyne elements documentation and API, check the Lyne Elements Storybook on [https://lyne-storybook.app.sbb.ch/?path=/docs/elements-sbb-accordion-sbb-expansion-panel--docs](https://lyne-storybook.app.sbb.ch/?path=/docs/elements-sbb-accordion-sbb-expansion-panel--docs).

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
