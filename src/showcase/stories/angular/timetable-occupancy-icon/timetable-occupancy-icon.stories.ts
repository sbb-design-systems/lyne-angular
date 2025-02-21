import { SbbTimetableOccupancyIcon } from '@sbb-esta/lyne-angular/timetable-occupancy-icon';
import { Args, Meta } from '@storybook/angular';
import { ArgTypes, InputType, StoryContext } from '@storybook/types';

import { spreadArgs } from '../../../tools/spread-args';

const occupancy: InputType = {
  control: {
    type: 'select',
  },
  options: ['high', 'medium', 'low', 'none'],
};

const argTypes: ArgTypes = { occupancy };

const args: Args = { occupancy: occupancy.options![0] };

const meta: Meta = {
  title: 'elements/sbb-timetable/sbb-timetable-occupancy-icon',
  component: SbbTimetableOccupancyIcon,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: (args) => ({
    props: { ...args },
    template: `<sbb-timetable-occupancy-icon ${spreadArgs(args)}></sbb-timetable-occupancy-icon>`,
  }),
};
export default meta;

export const Default = {};
