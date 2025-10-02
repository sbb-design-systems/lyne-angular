import { SbbCarousel, SbbCarouselItem, SbbCarouselList } from '@sbb-esta/lyne-angular/carousel';
import { SbbCompactPaginator } from '@sbb-esta/lyne-angular/paginator/compact-paginator';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import type { InputType } from 'storybook/internal/types';

const images: string[] = [
  'https://cdn.img.sbb.ch/content/dam/internet/externe-assets/lyne/Billetkontrolle.jpg',
  'https://cdn.img.sbb.ch/content/dam/internet/externe-assets/lyne/Hoehenrundweg-Gryden-Lenk.jpg',
  'https://cdn.img.sbb.ch/content/dam/internet/externe-assets/lyne/Kaufmann-frau.jpg',
];

const shadow: InputType = {
  control: {
    type: 'boolean',
  },
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbCarouselList, SbbCarouselItem, SbbCompactPaginator],
    }),
  ],
  title: 'elements/sbb-carousel/sbb-carousel',
  component: SbbCarousel,
  argTypes: {
    shadow,
  },
  args: {
    shadow: true,
  },
};
export default meta;

export const Native = {
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-carousel ${argsToTemplate(args)}>
        <sbb-carousel-list>
          ${new Array(3)
            .fill(null)
            .map(
              (_, i) => `
              <sbb-carousel-item>
                <img src="${images[i]}" alt="SBB image" height="450" width="800" />
              </sbb-carousel-item>
            `,
            )
            .join('')}
        </sbb-carousel-list>
        <sbb-compact-paginator></sbb-compact-paginator>
      </sbb-carousel>
    `,
  }),
};

export const SbbImage = {
  render: (args: Args) => ({
    template: `
      <sbb-carousel ${argsToTemplate(args)}>
        <sbb-carousel-list>
          ${new Array(3)
            .fill(null)
            .map(
              (_, i) => `
              <sbb-carousel-item>
                <sbb-image
                  image-src="${images[i]}"
                  alt="SBB image"
                  style="width: 800px; height: 450px;"
                ></sbb-image>
              </sbb-carousel-item>
            `,
            )
            .join('')}
        </sbb-carousel-list>
        <sbb-compact-paginator></sbb-compact-paginator>
      </sbb-carousel>
    `,
  }),
};

export const Figure = {
  render: (args: Args) => ({
    template: `
      <sbb-carousel ${argsToTemplate(args)}>
        <sbb-carousel-list>
          ${new Array(3)
            .fill(null)
            .map(
              (_, i) => `
              <sbb-carousel-item>
                <figure class="sbb-figure" style="width:800px; height:450px;">
                  <img src="${images[i]}" alt="SBB image ${i + 1}"  />
                  <figcaption style="text-align: center;">
                    Caption for picture ${i + 1}
                  </figcaption>
                </figure>
              </sbb-carousel-item>
            `,
            )
            .join('')}
        </sbb-carousel-list>
        <sbb-compact-paginator></sbb-compact-paginator>
      </sbb-carousel>
    `,
  }),
};

export const Link = {
  render: (args: Args) => ({
    template: `
      <sbb-carousel ${argsToTemplate(args)}>
        <sbb-carousel-list>
          ${new Array(3)
            .fill(null)
            .map(
              (_, i) => `
              <sbb-carousel-item>
                <a href="https://github.com/sbb-design-systems/lyne-components" target="_blank" tabindex="-1">
                  <sbb-image
                    image-src="${images[i]}"
                    alt="SBB image ${i + 1}"
                    style="width: 800px; height: 450px;"
                  ></sbb-image>
                  </a>
              </sbb-carousel-item>
            `,
            )
            .join('')}
        </sbb-carousel-list>
        <sbb-compact-paginator></sbb-compact-paginator>
      </sbb-carousel>
    `,
  }),
};
