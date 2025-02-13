import { SbbDivider } from '@sbb-esta/lyne-angular/divider';
import { Meta } from '@storybook/angular';
import { InputType, StoryContext } from '@storybook/types';

import { spreadArgs } from '../../../tools/spread-args';

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
  render: (args) => ({
    props: { ...args },
    template: `
      <div style="height: 340px; padding: 20px;">
        <sbb-divider ${spreadArgs(args)}></sbb-divider>
      </div>
    `,
  }),
};
export default meta;

export const Default = {};
