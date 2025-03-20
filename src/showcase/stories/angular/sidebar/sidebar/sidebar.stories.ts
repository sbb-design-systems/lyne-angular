import { SbbSidebar } from '@sbb-esta/lyne-angular/sidebar/sidebar';
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
  title: 'elements/sbb-sidebar',
  component: SbbSidebar,
  parameters: {
    // add events or remove the 'action' object
    actions: { handles: ['click'] },
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-sidebar ${argsToTemplate(args)}></sbb-sidebar>`,
  }),
};
export default meta;

export const Default = {};
