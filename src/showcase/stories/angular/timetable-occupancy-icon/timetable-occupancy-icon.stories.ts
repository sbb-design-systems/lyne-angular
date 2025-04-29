import { SbbTimetableOccupancyIcon } from '@sbb-esta/lyne-angular/timetable-occupancy-icon';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import type { ArgTypes, InputType, StoryContext } from '@storybook/types';

const occupancy: InputType = {
  control: {
    type: 'select',
  },
  options: ['high', 'medium', 'low', 'none'],
};

const noSanitize: InputType = {
  control: false,
  table: { disable: true },
};

const argTypes: ArgTypes = {
  occupancy,
  noSanitize,
};

const args: Args = {
  occupancy: occupancy.options![0],
  negative: false,
};

const meta: Meta = {
  title: 'elements/timetable/sbb-timetable-occupancy-icon',
  component: SbbTimetableOccupancyIcon,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-timetable-occupancy-icon ${argsToTemplate(args)}></sbb-timetable-occupancy-icon>`,
  }),
};
export default meta;

export const Default = {};
