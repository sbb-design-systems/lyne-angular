import { SbbSidebarContent } from '@sbb-esta/lyne-angular/sidebar/sidebar-content';
import { Meta } from '@storybook/angular';

const meta: Meta = {
  title: 'elements/sbb-sidebar-content',
  component: SbbSidebarContent,
  render: () => ({
    template: `
      <div>
        'sbb-sidebar-content' is an element to be only used together with 'sbb-sidebar'.
        See 'sbb-sidebar' examples to see it in action.
      </div>
    `,
  }),
};
export default meta;

export const Default = {};
