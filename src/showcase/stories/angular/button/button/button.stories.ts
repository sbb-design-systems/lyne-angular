import { SbbButton } from '@sbb-esta/lyne-angular/button/button';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, Meta } from '@storybook/angular';
import { ArgTypes, StoryContext } from '@storybook/types';

import { spreadArgs } from '../../../../tools/spread-args';

const argTypes: ArgTypes = { text: { control: { type: 'text' } } };

const args: Args = { text: 'Button' };

const meta: Meta = {
  decorators: [withActions],
  title: 'elements/sbb-button/sbb-button',
  component: SbbButton,
  parameters: {
    actions: { handles: ['click'] },
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-iron)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: ({ text, ...args }) => ({
    props: { text, ...args },
    template: `<sbb-button ${spreadArgs(args)}>${text}</sbb-button>`,
  }),
};
export default meta;

export const Default = {};
