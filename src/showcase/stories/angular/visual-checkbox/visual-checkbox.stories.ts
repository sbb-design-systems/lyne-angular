import { SbbVisualCheckbox } from '@sbb-esta/lyne-angular/visual-checkbox';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';
import type { ArgTypes, InputType, StoryContext } from 'storybook/internal/types';

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's', 'xs'],
};

const argTypes: ArgTypes = { size };

const args: Args = {
  size: size.options![0],
  checked: false,
  disabled: false,
  indeterminate: false,
  negative: false,
};

const meta: Meta = {
  decorators: [withActions],
  title: 'internals/sbb-visual-checkbox',
  component: SbbVisualCheckbox,
  parameters: {
    actions: { handles: ['click'] },
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-visual-checkbox ${argsToTemplate(args)}></sbb-visual-checkbox>`,
  }),
};
export default meta;

export const Default = {};
