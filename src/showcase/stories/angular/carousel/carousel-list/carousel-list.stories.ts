import { SbbCarouselItem, SbbCarouselList } from '@sbb-esta/lyne-angular/carousel';
import type { Meta } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

const images: string[] = [
  'https://cdn.img.sbb.ch/content/dam/internet/lyne/Billetkontrolle.jpg',
  'https://cdn.img.sbb.ch/content/dam/internet/lyne/Hoehenrundweg-Gryden-Lenk.jpg',
  'https://cdn.img.sbb.ch/content/dam/internet/lyne/Kaufmann-frau.jpg',
];

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbCarouselItem],
    }),
  ],
  title: 'elements/sbb-carousel/sbb-carousel-list',
  component: SbbCarouselList,
};
export default meta;

export const Native = {
  render: () => ({
    template: `
      <sbb-carousel-list>
        ${new Array(3)
          .fill(null)
          .map(
            (_, i) => `
              <sbb-carousel-item>
                <img src="${images[i]}" alt="SBB image" height="300" width="400" />
              </sbb-carousel-item>
            `,
          )
          .join('')}
      </sbb-carousel-list>
    `,
  }),
};

export const SbbImage = {
  render: () => ({
    template: `
      <sbb-carousel-list>
        ${new Array(3)
          .fill(null)
          .map(
            (_, i) => `
              <sbb-carousel-item>
                <sbb-image
                  image-src="${images[i]}"
                  alt="SBB image"
                  style="width: 400px; height: 300px;"
                ></sbb-image>
              </sbb-carousel-item>
            `,
          )
          .join('')}
      </sbb-carousel-list>
    `,
  }),
};

export const Caption = {
  render: () => ({
    template: `
      <sbb-carousel-list>
        ${new Array(3)
          .fill(null)
          .map(
            (_, i) => `
              <sbb-carousel-item>
                <div class="sbb-image">
                  <img src="${images[i]}" alt="SBB image ${i + 1}" width="400" height="300" />
                  <figcaption style="text-align: center;">
                    Caption for picture ${i + 1}
                  </figcaption>
                </div>
              </sbb-carousel-item>
            `,
          )
          .join('')}
      </sbb-carousel-list>
    `,
  }),
};
