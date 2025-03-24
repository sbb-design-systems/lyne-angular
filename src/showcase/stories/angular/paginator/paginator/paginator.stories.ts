import { SbbPaginator } from '@sbb-esta/lyne-angular/paginator/paginator';
import { Args, argsToTemplate, Meta } from '@storybook/angular';
import { ArgTypes, InputType, StoryContext } from '@storybook/types';

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
  'page-size-options': pageSizeOptions,
  'pager-position': pagerPosition,
  size,
};

const args: Args = {
  length: 100,
  'page-size': 10,
  'page-index': 0,
  'page-size-options': pageSizeOptions.options![0],
  'pager-position': pagerPosition.options![0],
  size: size.options![0],
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
