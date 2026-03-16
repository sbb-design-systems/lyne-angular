import { SbbRadioButton } from '@sbb-esta/lyne-angular/radio-button';
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
  title: 'elements/sbb-radio-button',
  component: SbbRadioButton,
  parameters: {
    // add events or remove the 'action' object
    actions: { handles: ['click'] },
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-radio-button ${argsToTemplate(args)}></sbb-radio-button>`,
  }),
};
export default meta;

export const Default = {};
