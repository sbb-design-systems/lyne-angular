import {
  SbbFlipCard,
  SbbFlipCardDetails,
  SbbFlipCardSummary,
} from '@sbb-esta/lyne-angular/flip-card';
import { SbbImage } from '@sbb-esta/lyne-angular/image';
import { SbbLink } from '@sbb-esta/lyne-angular/link/link';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import type { Args, Meta } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';
import type { ArgTypes, InputType } from 'storybook/internal/types';

const imageAlignment: InputType = {
  control: {
    type: 'select',
  },
  options: ['after', 'below'],
  table: {
    category: 'Summary',
  },
};

const label: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Summary',
  },
};

const text: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Detail',
  },
};

const accessibilityLabel: InputType = {
  control: {
    type: 'text',
  },
};

const argTypes: ArgTypes = {
  imageAlignment,
  label,
  accessibilityLabel,
  text,
};

const args: Args = {
  imageAlignment: imageAlignment.options![0],
  label: 'Summary',
  accessibilityLabel: undefined,
  text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam luctus ornare condimentum.`,
};

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbFlipCardDetails, SbbFlipCardSummary, SbbImage, SbbTitle, SbbLink],
    }),
  ],
  title: 'elements/sbb-flip-card/sbb-flip-card',
  component: SbbFlipCard,
  parameters: {
    actions: { handles: ['click'] },
  },
  argTypes,
  args,
  render: ({ imageAlignment, label, accessibilityLabel, text }: Args) => ({
    props: { imageAlignment, label, accessibilityLabel, text },
    template: `
      <div style="max-width: 792px;">
        <sbb-flip-card [accessibilityLabel]="accessibilityLabel">
          <sbb-flip-card-summary [imageAlignment]="imageAlignment">
            <sbb-title level="4">{{label}}</sbb-title>
            <sbb-image
              slot="image"
              imageSrc='https://cdn.img.sbb.ch/content/dam/internet/externe-assets/lyne/Billetkontrolle.jpg'
              alt="Conductor controlling a ticket"
            ></sbb-image>
          </sbb-flip-card-summary>
          <sbb-flip-card-details>
            {{text}}
            <sbb-link href="https://www.sbb.ch" negative>Link</sbb-link>
          </sbb-flip-card-details>
        </sbb-flip-card>
      </div>
    `,
  }),
};
export default meta;

export const Default = {};
