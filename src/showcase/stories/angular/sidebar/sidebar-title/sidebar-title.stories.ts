import { SbbSidebarTitle } from '@sbb-esta/lyne-angular/sidebar/sidebar-title';
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
  title: 'elements/sbb-sidebar-title',
  component: SbbSidebarTitle,
  parameters: {
    // add events or remove the 'action' object
    actions: { handles: ['click'] },
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-sidebar-title ${argsToTemplate(args)}></sbb-sidebar-title>`,
  }),
};
export default meta;

export const Default = {};
