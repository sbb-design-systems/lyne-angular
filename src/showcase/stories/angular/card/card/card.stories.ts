import { SbbCard } from '@sbb-esta/lyne-angular/card';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import type { InputType, StoryContext } from 'storybook/internal/types';

const spacing: InputType = {
  control: {
    type: 'select',
  },
  options: [
    'sbb-card-spacing-3x-xxs',
    'sbb-card-spacing-xxxs-xxs',
    'sbb-card-spacing-xxxs-s',
    'sbb-card-spacing-4x-xxs',
    'sbb-card-spacing-xxs',
    'sbb-card-spacing-s',
    'sbb-card-spacing-l',
  ],
};

const color: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['white', 'milk', 'transparent-bordered', 'transparent-bordered-dashed'],
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbTitle],
    }),
  ],
  title: 'elements/sbb-card/sbb-card',
  component: SbbCard,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['color'] === 'milk'
        ? 'var(--sbb-background-color-1)'
        : 'var(--sbb-background-color-3)',
  },
  argTypes: { spacing, color },
  args: {
    spacing: spacing.options![2],
    color: color.options![0],
  },
  render: ({ spacing, ...args }: Args) => ({
    props: { ...args },
    template: `
      <sbb-card ${argsToTemplate(args)} class="${spacing}">
        <sbb-title level="4">Example text</sbb-title>
        <span class="sbb-text-m">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porttitor blandit odio, ut blandit
          libero cursus vel. Nunc eu congue mauris. Quisque sed facilisis leo. Curabitur malesuada,
          nibh ac blandit vehicula, urna sem scelerisque magna, sed tincidunt neque arcu ac justo.
        </span>
      </sbb-card>
    `,
  }),
};
export default meta;

export const Default = {};
