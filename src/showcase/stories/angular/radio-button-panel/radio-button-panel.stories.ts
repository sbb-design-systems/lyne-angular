import { SbbRadioButtonPanel } from '@sbb-esta/lyne-angular/radio-button-panel';
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
  title: 'elements/sbb-radio-button-panel',
  component: SbbRadioButtonPanel,
  parameters: {
    // add events or remove the 'action' object
    actions: { handles: ['click'] },
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-radio-button-panel ${argsToTemplate(args)}></sbb-radio-button-panel>`,
  }),
};
export default meta;

export const Default = {};
