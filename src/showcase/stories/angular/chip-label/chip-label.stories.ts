import { SbbChipLabel } from '@sbb-esta/lyne-angular/chip-label';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import type { ArgTypes, InputType, StoryContext } from '@storybook/types';

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['xxs', 'xs', 's'],
};

const color: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['milk', 'charcoal', 'white', 'granite'],
};

const label: InputType = {
  control: {
    type: 'text',
  },
};

const argTypes: ArgTypes = {
  color,
  size,
  label,
};

const args: Args = {
  size: size.options![0],
  color: color.options![0],
  label: 'Label',
};

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
    template: `<sbb-chip-label ${argsToTemplate(args)}>${label}</sbb-chip-label>`,
  }),
};
export default meta;

export const Default = {};
