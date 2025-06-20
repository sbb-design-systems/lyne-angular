import { SbbBlockLinkButton } from '@sbb-esta/lyne-angular/link/block-link-button';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';
import type { ArgTypes, InputType, StoryContext } from 'storybook/internal/types';

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

const value: InputType = {
  control: {
    type: 'text',
  },
};

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

const argTypes: ArgTypes = {
  text,
  size,
  type,
  iconPlacement,
  value,
  ariaLabel,
};

const args: Args = {
  text: 'Travelcards & tickets',
  size: size.options![1],
  type: type.options![0],
  iconPlacement: iconPlacement.options![0],
  name: 'Button name',
  negative: false,
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
    template: `
      <sbb-block-link-button ${argsToTemplate(args)}>
        ${text}
      </sbb-block-link-button>
    `,
  }),
};
export default meta;

export const Default = {};
