import { SbbCompactPaginator } from '@sbb-esta/lyne-angular/paginator/compact-paginator';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import type { ArgTypes, InputType, StoryContext } from '@storybook/types';

const pagerPosition: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['start', 'end'],
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's'],
};

const argTypes: ArgTypes = {
  pagerPosition,
  size,
};

const args: Args = {
  length: 100,
  pageSize: 10,
  pageIndex: 0,
  pagerPosition: pagerPosition.options![0],
  size: size.options![0],
  negative: false,
  disabled: false,
};

const meta: Meta = {
  title: 'elements/sbb-paginator/sbb-compact-paginator',
  component: SbbCompactPaginator,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-compact-paginator aria-label="Select page" ${argsToTemplate(args)}></sbb-compact-paginator>`,
  }),
};
export default meta;

export const Default = {};
