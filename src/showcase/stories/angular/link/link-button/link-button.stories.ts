import { SbbLinkButton } from '@sbb-esta/lyne-angular/link/link-button';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';
import type { ArgTypes, InputType, StoryContext } from 'storybook/internal/types';

const text: InputType = {
  control: {
    type: 'text',
  },
};

const type: InputType = {
  control: {
    type: 'select',
  },
  options: ['button', 'reset', 'submit'],
};

const size: InputType = {
  control: {
    type: 'select',
  },
  options: ['xs', 's', 'm'],
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
  type,
  size,
  value,
  ariaLabel,
};

const args: Args = {
  text: 'Travelcards & tickets',
  type: type.options![0],
  name: 'Button name',
  size: size.options![1],
  disabled: false,
  disabledInteractive: false,
  negative: false,
};

const meta: Meta = {
  decorators: [withActions],
  title: 'elements/sbb-link/sbb-link-button',
  component: SbbLinkButton,
  parameters: {
    actions: { handles: ['click'] },
    backgroundColor: (context: StoryContext) =>
      context.args['negative']
        ? 'var(--sbb-background-color-1-negative)'
        : 'var(--sbb-background-color-1)',
  },
  argTypes,
  args,
  render: ({ text, ...args }: Args) => ({
    props: { text, ...args },
    template: `
       <p
        style="${args['negative'] ? 'color: var(--sbb-color-4-negative);' : 'color: var(--sbb-color-4)'}"
        class="sbb-text-m"
      >
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
        sit amet.
        <sbb-link-button ${argsToTemplate(args)}>${text}</sbb-link-button>
      </p>
    `,
  }),
};
export default meta;

export const Default = {};
