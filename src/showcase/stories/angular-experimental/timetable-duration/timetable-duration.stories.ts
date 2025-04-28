import { SbbTimetableDuration } from '@sbb-esta/lyne-angular-experimental/timetable-duration';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import type { ArgTypes } from '@storybook/types';

const argTypes: ArgTypes = {
  config: { control: 'object' },
};

const args: Args = {
  config: JSON.stringify({ hours: 1, minutes: 1 }),
};

const meta: Meta = {
  title: 'experimental/sbb-timetable-duration',
  component: SbbTimetableDuration,
  argTypes,
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-timetable-duration ${argsToTemplate(args)}></sbb-timetable-duration>`,
  }),
};
export default meta;

export const Default = {};
