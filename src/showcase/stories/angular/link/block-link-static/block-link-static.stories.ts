import { SbbBlockLinkStatic } from '@sbb-esta/lyne-angular/link/block-link-static';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, Meta } from '@storybook/angular';
import { ArgTypes, InputType, StoryContext } from '@storybook/types';

import { spreadArgs } from '../../../../tools/spread-args';

const text: InputType = {
  control: {
    type: 'text',
  },
};

const size: InputType = {
  control: {
    type: 'select',
  },
  options: ['xs', 's', 'm'],
};

const iconPlacement: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['start', 'end'],
};

const argTypes: ArgTypes = {
  text,
  size,
  'icon-placement': iconPlacement,
};

const args: Args = {
  text: 'Travelcards & tickets',
  size: size.options![1],
  'icon-placement': iconPlacement.options![0],
};

const meta: Meta = {
  decorators: [withActions],
  title: 'elements/sbb-link/sbb-block-link-static',
  component: SbbBlockLinkStatic,
  parameters: {
    actions: { handles: ['click'] },
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-charcoal)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: ({ text, ...args }) => ({
    props: { text, ...args },
    template: `<sbb-block-link-static ${spreadArgs(args)}>${text}</sbb-block-link-static>`,
  }),
};
export default meta;

export const Default = {};
