import { SbbCheckboxPanel } from '@sbb-esta/lyne-angular/checkbox-panel';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      // add slotted components or remove
      imports: [],
    }),
  ],
  title: 'elements/sbb-checkbox-panel',
  component: SbbCheckboxPanel,
  parameters: {
    // add events or remove the 'action' object
    actions: { handles: ['click'] },
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-checkbox-panel ${argsToTemplate(args)}></sbb-checkbox-panel>`,
  }),
};
export default meta;

export const Default = {};
