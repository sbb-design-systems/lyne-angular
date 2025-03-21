import { SbbSidebarCloseButton } from '@sbb-esta/lyne-angular/sidebar/sidebar-close-button';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, argsToTemplate, Meta, moduleMetadata } from '@storybook/angular';

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      // add slotted components or remove
      imports: [],
    }),
  ],
  title: 'elements/sbb-sidebar/sbb-sidebar-close-button',
  component: SbbSidebarCloseButton,
  parameters: {
    // add events or remove the 'action' object
    actions: { handles: ['click'] },
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-sidebar-close-button ${argsToTemplate(args)}></sbb-sidebar-close-button>`,
  }),
};
export default meta;

export const Default = {};
