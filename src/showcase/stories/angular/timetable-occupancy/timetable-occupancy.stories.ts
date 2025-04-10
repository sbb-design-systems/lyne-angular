import { SbbTimetableOccupancy } from '@sbb-esta/lyne-angular/timetable-occupancy';
import { Args, argsToTemplate, Meta } from '@storybook/angular';
import { ArgTypes, InputType, StoryContext } from '@storybook/types';

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
  firstClassOccupancy,
  secondClassOccupancy,
};

const args: Args = {
  firstClassOccupancy: firstClassOccupancy.options![3],
  secondClassOccupancy: secondClassOccupancy.options![3],
  negative: false,
};

const meta: Meta = {
  title: 'elements/timetable/sbb-timetable-occupancy',
  component: SbbTimetableOccupancy,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-timetable-occupancy ${argsToTemplate(args)}></sbb-timetable-occupancy>`,
  }),
};
export default meta;

export const Default = {};
