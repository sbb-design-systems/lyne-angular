import { SbbSecondaryButton } from '@sbb-esta/lyne-angular/button/secondary-button';
import { SbbImage } from '@sbb-esta/lyne-angular/image';
import { SbbMessage } from '@sbb-esta/lyne-angular/message';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import type { ArgTypes, InputType } from '@storybook/types';

const titleLevel: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6],
};

const argTypes: ArgTypes = {
  titleLevel,
};

const args: Args = {
  titleContent: 'Unfortunately, an error has occurred.',
  titleLevel: 3,
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbImage, SbbSecondaryButton],
    }),
  ],
  title: 'elements/sbb-message',
  component: SbbMessage,
  argTypes,
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <div style="max-width: 45rem; margin: auto">
        <sbb-message ${argsToTemplate(args)}>
          <sbb-image slot="image" imageSrc='https://cdn.img.sbb.ch/content/dam/internet/lyne/Help-Teaser-Landscape.png'></sbb-image>
          <p slot="subtitle">Please reload the page or try your search again later.</p>
          <p slot="legend">Error code: 0001</p>
          <sbb-secondary-button slot="action" iconName="arrows-circle-small" size="m"></sbb-secondary-button>
        </sbb-message>
      </div>
    `,
  }),
};
export default meta;

export const Default = {};
