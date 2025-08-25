import { SbbFlipCardSummary } from '@sbb-esta/lyne-angular/flip-card';
import { SbbImage } from '@sbb-esta/lyne-angular/image';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import type { ArgTypes, InputType } from 'storybook/internal/types';

const imageAlignment: InputType = {
  control: {
    type: 'select',
  },
  options: ['after', 'below'],
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
        <sbb-flip-card-summary ${argsToTemplate(args)}>
          <sbb-title level="4">Summary</sbb-title>
          <sbb-image
            slot="image"
            imageSrc='https://cdn.img.sbb.ch/content/dam/internet/lyne/Billetkontrolle.jpg'
            alt="Conductor controlling a ticket"
          ></sbb-image>
        </sbb-flip-card-summary>
      </div>
    `,
  }),
};
export default meta;

export const Default = {};
