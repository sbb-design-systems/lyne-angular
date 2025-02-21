import { SbbButtonStatic } from '@sbb-esta/lyne-angular/button/button-static';
import { SbbChipLabel } from '@sbb-esta/lyne-angular/chip-label';
import { SbbTeaserProductStatic } from '@sbb-esta/lyne-angular/teaser-product/teaser-product-static';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import { Args, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType, StoryContext } from '@storybook/types';

import { spreadArgs } from '../../../../tools/spread-args';

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

const argTypes: ArgTypes = {
  'image-alignment': imageAlignment,
  withChip,
  withFooter,
};

const args: Args = {
  'image-alignment': imageAlignment.options![0],
  withChip: true,
  withFooter: true,
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbChipLabel, SbbTitle, SbbButtonStatic],
    }),
  ],
  title: 'elements/sbb-teaser/sbb-teaser-product-static',
  component: SbbTeaserProductStatic,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: ({ withChip, withFooter, ...args }: Args) => ({
    props: { withChip, withFooter, ...args },
    template: `
      <sbb-teaser-product-static ${spreadArgs(args)}>
        <figure slot="image" class="sbb-figure">
          <img src='https://cdn.img.sbb.ch/content/dam/internet/lyne/Hoehenrundweg-Gryden-Lenk.jpg' alt="" />
          ${
            withChip
              ? `<sbb-chip-label class=${args['image-alignment'] === 'after' ? 'sbb-figure-overlap-start-end' : 'sbb-figure-overlap-start-start'}>
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
      </sbb-teaser-product-static>
    `,
  }),
};
export default meta;

export const Default = {};
