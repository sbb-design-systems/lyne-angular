import { SbbScreenReaderOnly } from '@sbb-esta/lyne-angular/screen-reader-only';
import { Args, Meta } from '@storybook/angular';

const meta: Meta = {
  title: 'internals/sbb-screen-reader-only',
  component: SbbScreenReaderOnly,
  argTypes: {
    content: { control: { type: 'text' } },
  },
  args: {
    content: `I'm visually hidden, but read to screen reader.`,
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `
      There is a visually hidden text here:
      <sbb-screen-reader-only>${args['content']}</sbb-screen-reader-only>
    `,
  }),
};
export default meta;

export const Default = {};
