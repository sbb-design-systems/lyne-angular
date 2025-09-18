import { SbbLinkStatic } from '@sbb-esta/lyne-angular/link/link-static';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';
import type { ArgTypes, InputType, StoryContext } from 'storybook/internal/types';

const text: InputType = {
  control: {
    type: 'text',
  },
};

const disabled: InputType = {
  control: false,
  table: { disable: true },
};

const size: InputType = {
  control: false,
  table: { disable: true },
};

const argTypes: ArgTypes = {
  text,
  disabled,
  size,
};

const args: Args = {
  text: 'Travelcards & tickets',
  negative: false,
};

const meta: Meta = {
  decorators: [withActions],
  title: 'elements/sbb-link/sbb-link-static',
  component: SbbLinkStatic,
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
        sit amet. <sbb-link-static ${argsToTemplate(args)}>${text}</sbb-link-static>
      </p>
    `,
  }),
};
export default meta;

export const Default = {};
