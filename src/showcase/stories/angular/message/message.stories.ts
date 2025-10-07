import { SbbSecondaryButton } from '@sbb-esta/lyne-angular/button/secondary-button';
import { SbbImage } from '@sbb-esta/lyne-angular/image';
import { SbbMessage } from '@sbb-esta/lyne-angular/message';
import type { Args, Meta } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbImage, SbbSecondaryButton],
    }),
  ],
  title: 'elements/sbb-message',
  component: SbbMessage,
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <div style="max-width: 45rem; margin: auto">
        <sbb-message>
          <sbb-image slot="image" imageSrc='https://cdn.img.sbb.ch/content/dam/internet/externe-assets/lyne/Frau-No-Results.png'></sbb-image>
          <sbb-title level="3" slot="title">Unfortunately, an error has occurred.</sbb-title>
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
