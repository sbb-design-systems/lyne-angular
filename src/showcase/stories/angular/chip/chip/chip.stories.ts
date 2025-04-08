import { SbbChip } from '@sbb-esta/lyne-angular/chip/chip';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, argsToTemplate, Meta } from '@storybook/angular';

const meta: Meta = {
  decorators: [withActions],
  title: 'elements/sbb-chip/sbb-chip',
  component: SbbChip,
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-chip ${argsToTemplate(args)}>Label</sbb-chip>`,
  }),
};
export default meta;

export const Default = {};
