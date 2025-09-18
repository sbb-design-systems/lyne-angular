import { SbbLogo } from '@sbb-esta/lyne-angular/logo';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import type { ArgTypes, InputType, StoryContext } from 'storybook/internal/types';

const protectiveRoom: InputType = {
  control: {
    type: 'select',
  },
  options: ['none', 'minimal', 'ideal'],
};

const argTypes: ArgTypes = { protectiveRoom };

const args: Args = {
  protectiveRoom: protectiveRoom.options![0],
  negative: false,
};

const meta: Meta = {
  title: 'elements/sbb-logo',
  component: SbbLogo,
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
      <div style='max-width: 300px;'>
        <sbb-logo ${argsToTemplate(args)}></sbb-logo>
      </div>
    `,
  }),
};
export default meta;

export const Default = {};
