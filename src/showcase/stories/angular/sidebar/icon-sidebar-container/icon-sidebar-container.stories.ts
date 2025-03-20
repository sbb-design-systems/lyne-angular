import { SbbIconSidebarContainer } from '@sbb-esta/lyne-angular/sidebar/icon-sidebar-container.js';
import { Meta } from '@storybook/angular';

const meta: Meta = {
  title: 'elements/sbb-icon-sidebar-container',
  component: SbbIconSidebarContainer,
  render: () => ({
    template: `
      <div>
        'sbb-icon-sidebar-container' is an element to be only used together with 'sbb-icon-sidebar'.
        See 'sbb-icon-sidebar' examples to see it in action.
      </div>
    `,
  }),
};
export default meta;

export const Default = {};
