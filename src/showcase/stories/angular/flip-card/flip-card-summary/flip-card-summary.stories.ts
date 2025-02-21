import { SbbFlipCardSummary } from '@sbb-esta/lyne-angular/flip-card/flip-card-summary';
import { SbbImage } from '@sbb-esta/lyne-angular/image';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import { Args, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

const imageAlignment: InputType = {
  control: {
    type: 'select',
  },
  options: ['after', 'below'],
  table: {
    category: 'Summary',
  },
};

const argTypes: ArgTypes = {
  imageAlignment,
};

const args: Args = {
  imageAlignment: imageAlignment.options![0],
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbTitle, SbbImage],
    }),
  ],
  title: 'elements/sbb-flip-card/sbb-flip-card-summary',
  component: SbbFlipCardSummary,
  argTypes,
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <div
        style="position: relative; display: flex; flex-flow: column wrap; gap: var(--sbb-spacing-responsive-xs); min-height: 17.5rem; background-color: var(--sbb-color-cloud-alpha-80);">
        <sbb-flip-card-summary image-alignment=${args['imageAlignment']}>
          <sbb-title level="4">Summary</sbb-title>
          <sbb-image
            slot="image"
            image-src='https://cdn.img.sbb.ch/content/dam/internet/lyne/Billetkontrolle.jpg'
            alt="Conductor controlling a ticket"
          ></sbb-image>
        </sbb-flip-card-summary>
      </div>
    `,
  }),
};
export default meta;

export const Default = {};
