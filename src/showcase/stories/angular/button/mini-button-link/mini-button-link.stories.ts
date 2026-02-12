import { SbbMiniButtonLink } from '@sbb-esta/lyne-angular/button/mini-button-link';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';

const meta: Meta = {
  decorators: [
    moduleMetadata({
      // add slotted components or remove
      imports: [],
    }),
  ],
  title: 'elements/sbb-mini-button-link',
  component: SbbMiniButtonLink,
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-mini-button-link icon-name="link-external-small" href="#" ${argsToTemplate(args)} ></sbb-mini-button-link>`,
  }),
};
export default meta;

export const Default = {};
