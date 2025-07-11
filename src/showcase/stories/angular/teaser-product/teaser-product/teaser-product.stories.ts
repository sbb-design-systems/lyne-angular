import { SbbButtonStatic } from '@sbb-esta/lyne-angular/button/button-static';
import { SbbChipLabel } from '@sbb-esta/lyne-angular/chip-label';
import { SbbTeaserProduct } from '@sbb-esta/lyne-angular/teaser-product/teaser-product';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import type { ArgTypes, InputType, StoryContext } from 'storybook/internal/types';

const imageAlignment: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['after', 'before'],
};

const withChip: InputType = {
  control: {
    type: 'boolean',
  },
};

const withFooter: InputType = {
  control: {
    type: 'boolean',
  },
};

const accessibilityCurrent: InputType = {
  control: false,
  table: { disable: true },
};

const download: InputType = {
  control: false,
  table: { disable: true },
};

const target: InputType = {
  control: false,
  table: { disable: true },
};

const rel: InputType = {
  control: false,
  table: { disable: true },
};

const argTypes: ArgTypes = {
  imageAlignment,
  withChip,
  withFooter,
  accessibilityCurrent,
  download,
  target,
  rel,
};

const args: Args = {
  imageAlignment: imageAlignment.options![0],
  withChip: true,
  withFooter: true,
  href: 'https://www.sbb.ch',
  accessibilityLabel: 'Benefit from up to 70% discount, Follow the link to benefit.',
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbChipLabel, SbbTitle, SbbButtonStatic],
    }),
  ],
  title: 'elements/sbb-teaser/sbb-teaser-product',
  component: SbbTeaserProduct,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: ({ withChip, withFooter, imageAlignment, ...args }: Args) => ({
    props: { withChip, withFooter, imageAlignment, ...args },
    template: `
      <sbb-teaser-product ${argsToTemplate({ imageAlignment, ...args })}>
        <figure slot="image" class="sbb-figure">
          <img src='https://cdn.img.sbb.ch/content/dam/internet/lyne/Hoehenrundweg-Gryden-Lenk.jpg' alt="" />
          ${
            withChip
              ? `<sbb-chip-label class=${imageAlignment === 'after' ? 'sbb-figure-overlap-start-end' : 'sbb-figure-overlap-start-start'}>
                  AI generated
                </sbb-chip-label>`
              : ''
          }
        </figure>
        <sbb-title level="3" class="sbb-teaser-product--spacing">
          Benefit from up to 70% discount
        </sbb-title>
        <p class="sbb-teaser-product--spacing">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium felis sit amet felis
          viverra lacinia. Donec et enim mi. Aliquam erat volutpat. Proin ut odio tellus. Donec tempor mi
          vel dapibus lobortis. Sed at ex sit amet leo suscipit fermentum. Donec consequat hendrerit
          tortor, ut laoreet velit congue in.
        </p>
        <sbb-button-static class="sbb-teaser-product--spacing">Label</sbb-button-static>
        ${
          withFooter
            ? `<p slot="footnote" class="sbb-teaser-product--spacing">
                Footnote Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium felis sit
                amet felis viverra lacinia. Donec et enim mi. Aliquam erat volutpat. Proin ut odio tellus. Donec
                tempor mi vel dapibus lobortis.
              </p>`
            : ''
        }
      </sbb-teaser-product>
    `,
  }),
};
export default meta;

export const Default = {};
