import { SbbChip } from '@sbb-esta/lyne-angular/chip/chip';
import { Args, argsToTemplate, Meta } from '@storybook/angular';

const meta: Meta = {
  title: 'elements/sbb-chip/sbb-chip',
  component: SbbChip,
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-chip ${argsToTemplate(args)}>Label</sbb-chip>`,
  }),
};
export default meta;

export const Default = {};
