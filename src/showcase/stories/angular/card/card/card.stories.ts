import { SbbCard } from '@sbb-esta/lyne-angular/card/card';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import { Args, Meta, moduleMetadata } from '@storybook/angular';
import { StoryContext } from '@storybook/types';

import { spreadArgs } from '../../../../helpers/spread-args';

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbTitle],
    }),
  ],
  title: 'elements/sbb-card/sbb-card',
  component: SbbCard,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['color'] === 'milk' ? 'var(--sbb-color-white)' : 'var(--sbb-color-milk)',
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-card ${spreadArgs(args)}>
        <sbb-title level="4">Example text</sbb-title>
        <span class="sbb-text-m">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porttitor blandit odio, ut blandit
          libero cursus vel. Nunc eu congue mauris. Quisque sed facilisis leo. Curabitur malesuada,
          nibh ac blandit vehicula, urna sem scelerisque magna, sed tincidunt neque arcu ac justo.
        </span>
      </sbb-card>
    `,
  }),
};
export default meta;

export const Default = {};
