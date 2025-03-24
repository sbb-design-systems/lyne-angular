import { SbbFlipCardDetails } from '@sbb-esta/lyne-angular/flip-card/flip-card-details';
import { SbbLink } from '@sbb-esta/lyne-angular/link/link';
import { Args, Meta, moduleMetadata } from '@storybook/angular';

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbLink],
    }),
  ],
  title: 'elements/sbb-flip-card/sbb-flip-card-details',
  component: SbbFlipCardDetails,
  parameters: {
    backgroundColor: () => 'var(--sbb-color-midnight)',
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-flip-card-details style="--sbb-flip-card-details-opacity: 1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam luctus ornare condimentum. Vivamus
        turpis elit, dapibus eget fringilla pellentesque, lobortis in nibh. Duis dapibus vitae tortor
        ullamcorper maximus. In convallis consectetur felis.
        <sbb-link href="https://www.sbb.ch" negative>Link</sbb-link>
      </sbb-flip-card-details>
    `,
  }),
};
export default meta;

export const Default = {};
