import { SbbTimetableOccupancy } from '@sbb-esta/lyne-angular/timetable-occupancy';
import { Args, Meta } from '@storybook/angular';
import { ArgTypes, InputType, StoryContext } from '@storybook/types';

import { spreadArgs } from '../../../tools/spread-args';

const firstClassOccupancy: InputType = {
  control: {
    type: 'select',
  },
  options: ['high', 'medium', 'low', 'none'],
};

const secondClassOccupancy: InputType = {
  control: {
    type: 'select',
  },
  options: ['high', 'medium', 'low', 'none'],
};

const argTypes: ArgTypes = {
  'first-class-occupancy': firstClassOccupancy,
  'second-class-occupancy': secondClassOccupancy,
};

const args: Args = {
  'first-class-occupancy': firstClassOccupancy.options![3],
  'second-class-occupancy': secondClassOccupancy.options![3],
};

const meta: Meta = {
  title: 'elements/sbb-timetable/sbb-timetable-occupancy',
  component: SbbTimetableOccupancy,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: (args) => ({
    props: { ...args },
    template: `<sbb-timetable-occupancy ${spreadArgs(args)}></sbb-timetable-occupancy>`,
  }),
};
export default meta;

export const Default = {};
