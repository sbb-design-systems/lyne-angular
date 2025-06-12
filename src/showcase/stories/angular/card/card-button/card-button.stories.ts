import { SbbCard } from '@sbb-esta/lyne-angular/card/card';
import { SbbCardButton } from '@sbb-esta/lyne-angular/card/card-button';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import type { ArgTypes, InputType } from 'storybook/internal/types';

const label: InputType = {
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

const value: InputType = {
  control: {
    type: 'text',
  },
};

const argTypes: ArgTypes = {
  label,
  type,
  value,
};

const args = {
  label: 'Click this card to follow the action.',
  type: type.options![0],
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbCard, SbbTitle],
    }),
  ],
  title: 'elements/sbb-card/sbb-card-button',
  component: SbbCardButton,
  argTypes,
  args,
  render: ({ label, ...args }: Args) => ({
    props: { label, ...args },
    template: `
      <sbb-card color="milk">
        <sbb-card-button ${argsToTemplate(args)}>${label}</sbb-card-button>
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
