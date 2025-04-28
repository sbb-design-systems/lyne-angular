import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import type { Meta } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

const text = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
  labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
  Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
  consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
  At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
  Lorem ipsum dolor sit amet.`;

const TextTemplate = (): string => `
  ${['xxs', 'xs', 's', 'm', 'l', 'xl']
    .map((textSize, index, sizes) => [
      `
      <sbb-title level=${sizes.length - index}>
        Titel Level ${sizes.length - index} / Text size ${textSize}
      </sbb-title>
      <p class="${`sbb-text-${textSize}`}">${text}</p>
    `,
    ])
    .join('')}
`;

const TextBoldTemplate = (): string => `
  ${['xxs', 'xs', 's', 'm', 'l', 'xl']
    .map((textSize, index, sizes) => [
      `
      <sbb-title level=${sizes.length - index}>
        Titel Level ${sizes.length - index} / Text size ${textSize}
      </sbb-title>
      <p class="${`sbb-text-${textSize} sbb-text--bold`}">${text}</p>
    `,
    ])
    .join('')}
`;

const LegendSubSupTemplate = (): string => `
  <p class="sbb-text-m">A sentence with a<sub>subscript</sub> character.</p>
  <span class="sbb-legend">
    <sup>1</sup>&nbsp;Legend text which is small and should be placed at the end.
  </span>
`;

export const Text = {
  render: () => ({
    template: TextTemplate(),
  }),
};

export const TextBold = {
  render: () => ({
    template: TextBoldTemplate(),
  }),
};

export const LegendSubSup = {
  render: () => ({
    template: LegendSubSupTemplate(),
  }),
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbTitle],
    }),
  ],
  title: 'styles/typography',
};

export default meta;
