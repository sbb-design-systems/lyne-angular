import { SbbChip } from '@sbb-esta/lyne-angular/chip';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import type { StoryContext } from 'storybook/internal/types';

const meta: Meta = {
  title: 'elements/sbb-chip/sbb-chip',
  component: SbbChip,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['negative']
        ? 'var(--sbb-background-color-1-negative)'
        : 'var(--sbb-background-color-1)',
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-chip ${argsToTemplate(args)}></sbb-chip>`,
  }),
};
export default meta;

export const Default = {};
