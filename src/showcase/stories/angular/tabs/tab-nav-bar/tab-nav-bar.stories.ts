import { SbbTabNavBar } from '@sbb-esta/lyne-angular/tabs';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';

const meta: Meta = {
  decorators: [withActions],
  title: 'elements/sbb-tab/sbb-tab-nav-bar',
  component: SbbTabNavBar,
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-tab-nav-bar ${argsToTemplate(args)}>
      <a href="https://www.sbb.ch" class="sbb-active" aria-current="page">
        <sbb-icon name="app-icon-small"></sbb-icon>
        Nav item 1
      </a>
      <a href="https://www.sbb.ch">
        <sbb-icon name="user-small"></sbb-icon>
        Nav item 2
      </a>
      <a class="sbb-disabled" aria-disabled="true" role="link">
        <sbb-icon name="circle-information-small"></sbb-icon>
        Nav item 3
      </a>
      <a href="https://www.sbb.ch">
        <sbb-icon name="pie-small"></sbb-icon>
        Nav item 4
      </a>
    </sbb-tab-nav-bar>
  `,
  }),
};
export default meta;

export const Default = {};
