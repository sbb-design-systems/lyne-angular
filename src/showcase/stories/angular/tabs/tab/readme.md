This documentation focuses on the Angular features of the `sbb-tab`.
For Lyne elements documentation and API, check the Lyne Elements Storybook on [https://lyne-storybook.app.sbb.ch/?path=/docs/elements-sbb-tab-sbb-tab--docs](https://lyne-storybook.app.sbb.ch/?path=/docs/elements-sbb-tab-sbb-tab--docs).

On top of the Lyne Elements functionality, the Angular wrapper provides a `SbbTabContent` directive.
By default, the tab contents are eagerly loaded. Eagerly loaded tabs will initialize the child components but not inject them into the DOM until the tab is activated.

If the tab contains several complex child components or the tab's contents rely on DOM calculations during initialization, it is advised to lazy load the tab's content.

Tab contents can be lazy loaded by declaring the body in a ng-template with the sbbTabContent attribute.

```ts
@Component({
  imports: [SbbTabsModule],
  template: `<sbb-tab-label active>Label</sbb-tab-label>
    <sbb-tab>
      <ng-template sbbTabContent>${text}</ng-template>
    </sbb-tab>`,
})
class TabsComponent {}
```
