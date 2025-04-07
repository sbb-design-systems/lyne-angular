import { SbbChipGroup } from '@sbb-esta/lyne-angular/chip/chip-group';
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
  title: 'elements/sbb-chip/sbb-chip-group',
  component: SbbChipGroup,
  parameters: {
    // add events or remove the 'action' object
    actions: { handles: ['click'] },
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-chip-group ${argsToTemplate(args)}></sbb-chip-group>`,
  }),
};
export default meta;

export const Default = {};
