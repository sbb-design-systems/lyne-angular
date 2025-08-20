import { SbbIconSidebarContent } from '@sbb-esta/lyne-angular/sidebar';
import type { Meta } from '@storybook/angular';

const meta: Meta = {
  title: 'elements/sbb-sidebar/sbb-icon-sidebar-content',
  component: SbbIconSidebarContent,
  render: () => ({
    template: `
      <div>
        'sbb-icon-sidebar-content' is an element to be only used together with 'sbb-icon-sidebar'.
        See 'sbb-icon-sidebar' examples to see it in action.
      </div>
    `,
  }),
};
export default meta;

export const Default = {};
