import { SbbCompactPaginator } from '@sbb-esta/lyne-angular/paginator/compact-paginator';
import { Args, Meta } from '@storybook/angular';
import { ArgTypes, InputType, StoryContext } from '@storybook/types';

import { spreadArgs } from '../../../../helpers/spread-args';

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
  'pager-position': pagerPosition,
  size,
};

const args: Args = {
  length: 100,
  'page-size': 10,
  'page-index': 0,
  'pager-position': pagerPosition.options![0],
  size: size.options![0],
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
    template: `<sbb-compact-paginator aria-label="Select page" ${spreadArgs(args)}></sbb-compact-paginator>`,
  }),
};
export default meta;

export const Default = {};
