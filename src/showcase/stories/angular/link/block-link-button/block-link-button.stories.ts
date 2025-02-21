import { SbbBlockLinkButton } from '@sbb-esta/lyne-angular/link/block-link-button';
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

const type: InputType = {
  control: {
    type: 'select',
  },
  options: ['button', 'reset', 'submit'],
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
  type,
  'icon-placement': iconPlacement,
};

const args: Args = {
  text: 'Travelcards & tickets',
  size: size.options![1],
  type: type.options![0],
  'icon-placement': iconPlacement.options![0],
};

const meta: Meta = {
  decorators: [withActions],
  title: 'elements/sbb-link/sbb-block-link-button',
  component: SbbBlockLinkButton,
  parameters: {
    actions: { handles: ['click'] },
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-charcoal)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: ({ text, ...args }: Args) => ({
    props: { text, ...args },
    template: `<sbb-block-link-button ${spreadArgs(args)}>${text}</sbb-block-link-button>`,
  }),
};
export default meta;

export const Default = {};
