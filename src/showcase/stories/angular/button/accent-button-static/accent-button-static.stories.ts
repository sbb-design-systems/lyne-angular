import { SbbAccentButtonStatic } from '@sbb-esta/lyne-angular/button/accent-button-static';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, Meta } from '@storybook/angular';
import { ArgTypes, StoryContext } from '@storybook/types';

import { spreadArgs } from '../../../../tools/spread-args';

const argTypes: ArgTypes = { text: { control: { type: 'text' } } };

const args: Args = { text: 'Button' };

const meta: Meta = {
  decorators: [withActions],
  title: 'elements/sbb-button/sbb-accent-button-static',
  component: SbbAccentButtonStatic,
  parameters: {
    actions: { handles: ['click'] },
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-iron)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: ({ text, ...args }) => ({
    props: { text, ...args },
    template: `<sbb-accent-button-static ${spreadArgs(args)}>${text}</sbb-accent-button-static>`,
  }),
};
export default meta;

export const Default = {};
