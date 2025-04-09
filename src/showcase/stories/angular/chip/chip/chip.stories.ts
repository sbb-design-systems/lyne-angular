import { SbbChip } from '@sbb-esta/lyne-angular/chip/chip';
import { Args, argsToTemplate, Meta } from '@storybook/angular';
import { StoryContext } from '@storybook/types';

const meta: Meta = {
  title: 'elements/sbb-chip/sbb-chip',
  component: SbbChip,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-chip ${argsToTemplate(args)}></sbb-chip>`,
  }),
};
export default meta;

export const Default = {};
