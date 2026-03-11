import { SbbCheckboxGroup } from '@sbb-esta/lyne-angular/checkbox-group';
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
  title: 'elements/sbb-checkbox-group',
  component: SbbCheckboxGroup,
  parameters: {
    // add events or remove the 'action' object
    actions: { handles: ['click'] },
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-checkbox-group ${argsToTemplate(args)}></sbb-checkbox-group>`,
  }),
};
export default meta;

export const Default = {};
