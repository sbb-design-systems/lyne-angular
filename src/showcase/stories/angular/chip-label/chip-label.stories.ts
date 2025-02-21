import { SbbChipLabel } from '@sbb-esta/lyne-angular/chip-label';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, Meta } from '@storybook/angular';
import { ArgTypes, InputType, StoryContext } from '@storybook/types';

import { spreadArgs } from '../../../tools/spread-args';

const label: InputType = {
  control: {
    type: 'text',
  },
};

const argTypes: ArgTypes = { label };

const args: Args = { label: 'Label' };

const meta: Meta = {
  decorators: [withActions],
  title: 'elements/sbb-chip-label',
  component: SbbChipLabel,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['color'] === 'milk' || context.args['color'] === 'white'
        ? 'var(--sbb-color-granite)'
        : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: ({ label, ...args }: Args) => ({
    props: { label, ...args },
    template: `<sbb-chip-label ${spreadArgs(args)}>${label}</sbb-chip-label>`,
  }),
};
export default meta;

export const Default = {};
