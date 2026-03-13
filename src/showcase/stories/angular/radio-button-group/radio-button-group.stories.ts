import { SbbRadioButtonGroup } from '@sbb-esta/lyne-angular/radio-button-group';
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
  title: 'elements/sbb-radio-button-group',
  component: SbbRadioButtonGroup,
  parameters: {
    // add events or remove the 'action' object
    actions: { handles: ['click'] },
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-radio-button-group ${argsToTemplate(args)}></sbb-radio-button-group>`,
  }),
};
export default meta;

export const Default = {};
