import { SbbDivider } from '@sbb-esta/lyne-angular/divider';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import type { ArgTypes, InputType, StoryContext } from 'storybook/internal/types';

const orientation: InputType = {
  control: {
    type: 'select',
  },
  options: ['horizontal', 'vertical'],
};

const argTypes: ArgTypes = {
  orientation,
};

const args: Args = {
  orientation: orientation.options![0],
  negative: false,
};

const meta: Meta = {
  title: 'elements/sbb-divider',
  component: SbbDivider,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['negative']
        ? 'var(--sbb-background-color-1-negative)'
        : 'var(--sbb-background-color-1)',
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
