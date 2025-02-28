import { SbbChipLabel } from '@sbb-esta/lyne-angular/chip-label';
import { SbbTeaser } from '@sbb-esta/lyne-angular/teaser';
import { Args, argsToTemplate, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

const titleContent: InputType = {
  control: {
    type: 'text',
  },
};

const titleLevel: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6],
};

const target: InputType = {
  control: {
    type: 'text',
  },
};

const chipContent: InputType = {
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
  'title-content': titleContent,
  'title-level': titleLevel,
  target,
  'chip-content': chipContent,
  alignment,
  href,
  description,
};

const args: Args = {
  'title-content': 'This is a title',
  target: '_blank',
  'chip-content': undefined,
  alignment: alignment.options![0],
  href: href.options![1],
  description: 'This is a paragraph',
  'accessibility-label':
    'The text which gets exposed to screen reader users. The text should reflect all the information which gets passed into the components slots and which is visible in the Teaser, either through text or iconography',
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbChipLabel],
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
            <img src="https://cdn.img.sbb.ch/content/dam/internet/lyne/Billetkontrolle.jpg" alt="400x300" />
            <sbb-chip-label class="sbb-figure-overlap-start-start">AI Generated</sbb-chip-label>
          </figure>
          ${description}
        </sbb-teaser>
      </div>
    `,
  }),
};
export default meta;

export const Default = {};
