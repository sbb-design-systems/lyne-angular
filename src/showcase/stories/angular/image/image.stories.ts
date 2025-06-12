import { SbbChipLabel } from '@sbb-esta/lyne-angular/chip-label';
import { SbbImage } from '@sbb-esta/lyne-angular/image';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import type { ArgTypes, InputType } from 'storybook/internal/types';

const importance: InputType = {
  control: false,
  table: { disable: true },
};

const decoding: InputType = {
  control: false,
  table: { disable: true },
};

const pictureSizesConfig: InputType = {
  control: false,
  table: { disable: true },
};

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

const borderRadius: InputType = {
  control: {
    type: 'select',
  },
  options: ['default', 'none', 'round'],
  table: {
    category: 'Utility classes',
  },
};

const aspectRatio: InputType = {
  control: { type: 'select' },
  options: ['free', '1-1', '1-2', '2-1', '2-3', '3-2', '3-4', '4-3', '4-5', '5-4', '9-16', '16-9'],
  table: {
    category: 'Utility classes',
  },
};

const chipPosition: InputType = {
  control: { type: 'select' },
  options: ['start-start', 'start-end', 'end-start', 'end-end'],
  table: {
    category: 'Utility classes',
  },
};

const argTypes: ArgTypes = {
  borderRadius,
  aspectRatio,
  imageSrc,
  importance,
  decoding,
  pictureSizesConfig,
};

const args: Args = {
  borderRadius: borderRadius.options![0],
  aspectRatio: aspectRatio.options![0],
  imageSrc: imageSrc.options![0],
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbChipLabel],
    }),
  ],
  title: 'elements/sbb-image',
  component: SbbImage,
  argTypes,
  args,
  render: ({ aspectRatio, borderRadius, ...args }: Args) => ({
    props: { aspectRatio, borderRadius, ...args },
    template: `
      <div style="max-width: 480px;">
        <sbb-image ${argsToTemplate(args)}
          class="sbb-image-${aspectRatio} sbb-image-border-radius-${borderRadius}">
        </sbb-image>
      </div>
    `,
  }),
};
export default meta;

export const Default = {};

export const WithChip = {
  argTypes: { ...argTypes, chipPosition },
  args: { ...args, chipPosition: chipPosition.options![0] },
  render: ({ aspectRatio, borderRadius, chipPosition, ...args }: Args) => ({
    props: { aspectRatio, borderRadius, chipPosition, ...args },
    template: `
      <div style="max-width: 480px;">
        <figure class="sbb-figure">
          <sbb-image
            ${argsToTemplate(args)}
            class="\`sbb-image-${aspectRatio} sbb-image-border-radius-${borderRadius}\`">
          </sbb-image>
          <sbb-chip-label class="sbb-figure-overlap-${chipPosition}">AI generated</sbb-chip-label>
        </figure>
      </div>
    `,
  }),
};
