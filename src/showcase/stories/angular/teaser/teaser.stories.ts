import { SbbChipLabel } from '@sbb-esta/lyne-angular/chip-label';
import { SbbTeaser } from '@sbb-esta/lyne-angular/teaser';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import type { ArgTypes, InputType } from 'storybook/internal/types';

const target: InputType = {
  control: {
    type: 'text',
  },
};

const alignment: InputType = {
  control: {
    type: 'select',
  },
  options: ['after-centered', 'after', 'below'],
};

const hrefs: string[] = [
  'https://www.sbb.ch',
  'https://github.com/sbb-design-systems/lyne-components',
];
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
};

const description: InputType = {
  control: {
    type: 'text',
  },
};

const argTypes: ArgTypes = {
  target,
  alignment,
  href,
  description,
};

const args: Args = {
  target: '_blank',
  alignment: alignment.options![0],
  href: href.options![1],
  description: 'This is a paragraph',
  accessibilityLabel:
    'The text which gets exposed to screen reader users. The text should reflect all the information which gets passed into the components slots and which is visible in the Teaser, either through text or iconography',
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbChipLabel, SbbTitle],
    }),
  ],
  title: 'elements/sbb-teaser/sbb-teaser',
  component: SbbTeaser,
  argTypes,
  args,
  render: ({ description, ...args }: Args) => ({
    props: { description, ...args },
    template: `
      <div style="max-width: 760px;">
        <sbb-teaser ${argsToTemplate(args)}>
          <figure slot="image" class="sbb-figure">
            <img src="https://cdn.img.sbb.ch/content/dam/internet/externe-assets/lyne/Billetkontrolle.jpg" alt="400x300" />
            <sbb-chip-label class="sbb-figure-overlap-start-start">AI Generated</sbb-chip-label>
          </figure>
          <sbb-chip-label>Chip content</sbb-chip-label>
          <sbb-title level="3">This is a title</sbb-title>
          ${description}
        </sbb-teaser>
      </div>
    `,
  }),
};
export default meta;

export const Default = {};
