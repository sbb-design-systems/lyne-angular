import { SbbCard } from '@sbb-esta/lyne-angular/card/card';
import { SbbCardLink } from '@sbb-esta/lyne-angular/card/card-link';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import { Args, argsToTemplate, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

const label: InputType = {
  control: { type: 'text' },
};

const hrefs = ['https://www.sbb.ch', 'https://github.com/sbb-design-systems/lyne-components'];
const href: InputType = {
  options: Object.keys(hrefs),
  mapping: hrefs,
  control: {
    type: 'select',
    labels: {
      0: 'sbb.ch',
      1: 'GitHub Lyne Components',
    },
  },
  table: {
    category: 'Card Action Link',
  },
};

const argTypes: ArgTypes = {
  label,
  href,
};

const args = {
  label: 'Click this card to follow the action.',
  href: href.options![0],
  target: '_blank',
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbCard, SbbTitle],
    }),
  ],
  title: 'elements/sbb-card/sbb-card-link',
  component: SbbCardLink,
  argTypes,
  args,
  render: ({ label, ...args }: Args) => ({
    props: { label, ...args },
    template: `
      <sbb-card color="milk">
        <sbb-card-link ${argsToTemplate(args)}>${label}</sbb-card-link>
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
