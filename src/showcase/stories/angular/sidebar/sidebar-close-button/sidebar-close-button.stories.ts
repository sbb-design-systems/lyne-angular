import { SbbSidebarCloseButton } from '@sbb-esta/lyne-angular/sidebar/sidebar-close-button';
import { Args, argsToTemplate, Meta } from '@storybook/angular';

const meta: Meta = {
  title: 'elements/sbb-sidebar/sbb-sidebar-close-button',
  component: SbbSidebarCloseButton,
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-sidebar-close-button ${argsToTemplate(args)}></sbb-sidebar-close-button>`,
  }),
};
export default meta;

export const Default = {};
