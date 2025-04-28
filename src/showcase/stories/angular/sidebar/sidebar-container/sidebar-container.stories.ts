import { SbbSidebarContainer } from '@sbb-esta/lyne-angular/sidebar/sidebar-container';
import type { Meta } from '@storybook/angular';

const meta: Meta = {
  title: 'elements/sbb-sidebar/sbb-sidebar-container',
  component: SbbSidebarContainer,
  render: () => ({
    template: `
      <div>
        'sbb-sidebar-container' is an element to be only used together with 'sbb-sidebar'.
        See 'sbb-sidebar' examples to see it in action.
      </div>
    `,
  }),
};
export default meta;

export const Default = {};
