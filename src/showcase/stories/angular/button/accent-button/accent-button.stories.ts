import { SbbAccentButton } from '@sbb-esta/lyne-angular/button/accent-button';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, argsToTemplate, Meta } from '@storybook/angular';
import { ArgTypes, InputType, StoryContext } from '@storybook/types';

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

const text: InputType = {
  control: {
    type: 'text',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['l', 'm', 's'],
};

const type: InputType = {
  control: {
    type: 'select',
  },
  options: ['button', 'reset', 'submit'],
};

const value: InputType = {
  control: {
    type: 'text',
  },
};

const argTypes: ArgTypes = {
  text,
  size,
  type,
  value,
  ariaLabel,
};

const args: Args = {
  text: 'Button',
  size: size.options![0],
  type: type.options![0],
};

const meta: Meta = {
  decorators: [withActions],
  title: 'elements/sbb-button/sbb-accent-button',
  component: SbbAccentButton,
  parameters: {
    actions: { handles: ['click'] },
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-iron)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: ({ text, ariaLabel, ...args }: Args) => ({
    props: { text, ariaLabel, ...args },
    template: `
      <sbb-accent-button ${argsToTemplate(args)} ${ariaLabel ? `aria-label="${ariaLabel}"` : ''}>
        ${text}
      </sbb-accent-button>
    `,
  }),
};
export default meta;

export const Default = {};
