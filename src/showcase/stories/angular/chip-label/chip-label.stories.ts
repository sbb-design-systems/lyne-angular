import { SbbChipLabel } from '@sbb-esta/lyne-angular/chip-label';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, argsToTemplate, Meta } from '@storybook/angular';
import { ArgTypes, InputType, StoryContext } from '@storybook/types';

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
    template: `<sbb-chip-label ${argsToTemplate(args)}>${label}</sbb-chip-label>`,
  }),
};
export default meta;

export const Default = {};
