import { SbbIconSidebarButton } from '@sbb-esta/lyne-angular/sidebar/icon-sidebar-button';
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
  title: 'elements/sbb-sidebar/sbb-icon-sidebar-button',
  component: SbbIconSidebarButton,
  parameters: {
    // add events or remove the 'action' object
    actions: { handles: ['click'] },
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-icon-sidebar-button ${argsToTemplate(args)}></sbb-icon-sidebar-button>`,
  }),
};
export default meta;

export const Default = {};
