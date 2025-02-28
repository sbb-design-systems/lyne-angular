import { SbbVisualCheckbox } from '@sbb-esta/lyne-angular/visual-checkbox';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, argsToTemplate, Meta } from '@storybook/angular';
import { ArgTypes, InputType, StoryContext } from '@storybook/types';

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's', 'xs'],
};

const argTypes: ArgTypes = { size };

const args: Args = {
  size: size.options![0],
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
