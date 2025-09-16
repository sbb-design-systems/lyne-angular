import { SbbCarouselItem } from '@sbb-esta/lyne-angular/carousel';
import { SbbImage } from '@sbb-esta/lyne-angular/image';
import type { Args, Meta } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import type { InputType } from 'storybook/internal/types';

const imageSrc: InputType = {
  control: {
    type: 'select',
  },
  options: [
    'https://cdn.img.sbb.ch/content/dam/internet/lyne/Billetkontrolle.jpg',
    'https://cdn.img.sbb.ch/content/dam/internet/lyne/Hoehenrundweg-Gryden-Lenk.jpg',
    'https://cdn.img.sbb.ch/content/dam/internet/lyne/Kaufmann-frau.jpg',
  ],
};

const TemplateNative = ({ imageSrc }: Args): string => `
  <sbb-carousel-item>
    <img src="${imageSrc}" alt="SBB image" height="600" width="800" />
  </sbb-carousel-item>
`;

const TemplateLyne = ({ imageSrc }: Args): string => `
  <sbb-carousel-item>
    <sbb-image
      image-src="${imageSrc}"
      alt="SBB image"
      style="width: 800px; height: 600px;"
    ></sbb-image>
  </sbb-carousel-item>
`;

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbImage],
    }),
  ],
  title: 'elements/sbb-carousel/sbb-carousel-item',
  component: SbbCarouselItem,
  argTypes: {
    imageSrc,
  },
  args: {
    imageSrc: imageSrc.options![0],
  },
};
export default meta;

export const Native = {
  render: (args: Args) => ({
    props: { ...args },
    template: TemplateNative(args),
  }),
};

export const Lyne = {
  render: (args: Args) => ({
    props: { ...args },
    template: TemplateLyne(args),
  }),
};
