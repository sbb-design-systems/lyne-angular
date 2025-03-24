import { SbbDivider } from '@sbb-esta/lyne-angular/divider';
import { Args, argsToTemplate, Meta } from '@storybook/angular';
import { InputType, StoryContext } from '@storybook/types';

const orientation: InputType = {
  control: {
    type: 'select',
  },
  options: ['horizontal', 'vertical'],
};

const argTypes = {
  orientation,
};

const args = {
  orientation: orientation.options![0],
};

const meta: Meta = {
  title: 'elements/sbb-divider',
  component: SbbDivider,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-charcoal)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <div style="height: 340px; padding: 20px;">
        <sbb-divider ${argsToTemplate(args)}></sbb-divider>
      </div>
    `,
  }),
};
export default meta;

export const Default = {};
