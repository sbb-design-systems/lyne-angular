import { SbbChip } from '@sbb-esta/lyne-angular/chip/chip';
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
  title: 'elements/sbb-chip/sbb-chip',
  component: SbbChip,
  parameters: {
    // add events or remove the 'action' object
    actions: { handles: ['click'] },
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-chip ${argsToTemplate(args)}></sbb-chip>`,
  }),
};
export default meta;

export const Default = {};
