import { SbbFlipCard } from '@sbb-esta/lyne-angular/flip-card/flip-card';
import { SbbFlipCardDetails } from '@sbb-esta/lyne-angular/flip-card/flip-card-details';
import { SbbFlipCardSummary } from '@sbb-esta/lyne-angular/flip-card/flip-card-summary';
import { SbbImage } from '@sbb-esta/lyne-angular/image';
import { SbbLink } from '@sbb-esta/lyne-angular/link/link';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import { withActions } from '@storybook/addon-actions/decorator';
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
  'accessibility-label': accessibilityLabel,
  text,
};

const args: Args = {
  imageAlignment: imageAlignment.options![0],
  label: 'Summary',
  'accessibility-label': undefined,
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
  render: (args) => ({
    props: { ...args },
    template: `
      <div style="max-width: 792px;">
        <sbb-flip-card accessibility-label=${args['accessibility-label']}>
          <sbb-flip-card-summary image-alignment=${args['imageAlignment']}>
            <sbb-title level="4">${args['label']}</sbb-title>
            <sbb-image
              slot="image"
              image-src='https://cdn.img.sbb.ch/content/dam/internet/lyne/Billetkontrolle.jpg'
              alt="Conductor controlling a ticket"
            ></sbb-image>
          </sbb-flip-card-summary>
          <sbb-flip-card-details>
            ${args['text']}
            <sbb-link href="https://www.sbb.ch" negative>Link</sbb-link>
          </sbb-flip-card-details>
        </sbb-flip-card>
      </div>
    `,
  }),
};
export default meta;

export const Default = {};
