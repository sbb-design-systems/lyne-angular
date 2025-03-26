import { SbbLogo } from '@sbb-esta/lyne-angular/logo';
import { Args, argsToTemplate, Meta } from '@storybook/angular';
import { ArgTypes, InputType, StoryContext } from '@storybook/types';

const protectiveRoom: InputType = {
  control: {
    type: 'select',
  },
  options: ['none', 'minimal', 'ideal'],
};

const argTypes: ArgTypes = { protectiveRoom };

const args: Args = { protectiveRoom: protectiveRoom.options![0] };

const meta: Meta = {
  title: 'elements/sbb-logo',
  component: SbbLogo,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-charcoal)' : 'var(--sbb-color-white)',
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
