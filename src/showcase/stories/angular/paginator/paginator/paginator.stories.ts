import { SbbPaginator } from '@sbb-esta/lyne-angular/paginator/paginator';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import type { ArgTypes, InputType, StoryContext } from '@storybook/types';

const pageSizeOptionsValues = [[], [10, 20, 50, 100], [10, 50, 100, 500]];
const pageSizeOptions: InputType = {
  options: Object.keys(pageSizeOptionsValues),
  mapping: pageSizeOptionsValues,
  control: {
    type: 'select',
    labels: {
      0: 'none',
      1: '10, 20, 50, 100',
      2: '10, 50, 100, 500',
    },
  },
};

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
  pageSizeOptions,
  pagerPosition,
  size,
};

const args: Args = {
  length: 100,
  pageSize: 10,
  pageIndex: 0,
  pageSizeOptions: pageSizeOptions.options![0],
  pagerPosition: pagerPosition.options![0],
  size: size.options![0],
  negative: false,
  disabled: false,
};

const meta: Meta = {
  title: 'elements/sbb-paginator/sbb-paginator',
  component: SbbPaginator,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: ({ ...args }: Args) => ({
    props: { ...args },
    template: `
     <sbb-paginator aria-label="Select page" ${argsToTemplate(args)}></sbb-paginator>
    `,
  }),
};
export default meta;

export const Default = {};
