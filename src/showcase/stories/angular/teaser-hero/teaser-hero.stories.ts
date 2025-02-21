import { SbbChipLabel } from '@sbb-esta/lyne-angular/chip-label';
import { SbbImage } from '@sbb-esta/lyne-angular/image';
import { SbbTeaserHero } from '@sbb-esta/lyne-angular/teaser-hero';
import { Args, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

import { spreadArgs } from '../../../helpers/spread-args';

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

const target: InputType = {
  control: {
    type: 'text',
  },
};

const content: InputType = {
  control: {
    type: 'text',
  },
};

const linkContent: InputType = {
  control: {
    type: 'text',
  },
};

const imageSrc: InputType = {
  control: {
    type: 'text',
  },
};

const imageAlt: InputType = {
  control: {
    type: 'text',
  },
};

const chipLabel: InputType = {
  control: {
    type: 'text',
  },
};

const argTypes: ArgTypes = {
  href,
  target,
  content,
  'link-content': linkContent,
  imageSrc,
  imageAlt,
  'chip-label': chipLabel,
};

const args: Args = {
  href: href.options![0],
  target: '_blank',
  content: 'Break out and explore castles and palaces.',
  'link-content': 'Find out more',
  imageSrc: 'https://cdn.img.sbb.ch/content/dam/internet/lyne/Hoehenrundweg-Gryden-Lenk.jpg',
  imageAlt: 'image alt',
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbImage, SbbChipLabel],
    }),
  ],
  title: 'elements/sbb-teaser/sbb-teaser-hero',
  component: SbbTeaserHero,
  argTypes,
  args,
  render: ({
    content,
    'link-content': linkContent,
    'chip-label': chipLabel,
    imageSrc,
    imageAlt,
    ...args
  }: Args) => ({
    props: {
      content,
      'link-content': linkContent,
      'chip-label': chipLabel,
      imageSrc,
      imageAlt,
      ...args,
    },
    template: `
      <sbb-teaser-hero ${spreadArgs(args)}>
        ${content ?? ''}
        ${linkContent ? `<span slot="link-content">${linkContent}</span>` : ''}
        ${
          !chipLabel
            ? `<sbb-image slot="image" image-src="${imageSrc}" alt=${imageAlt}></sbb-image>`
            : `
            <figure class="sbb-figure" slot="image">
              <sbb-image image-src="${imageSrc}" alt=${imageAlt}></sbb-image>
              <sbb-chip-label class="sbb-figure-overlap-start-start" style="z-index: 1">
                ${chipLabel}
              </sbb-chip-label>
            </figure>
        `
        }
      </sbb-teaser-hero>
    `,
  }),
};
export default meta;

export const Default = {};
