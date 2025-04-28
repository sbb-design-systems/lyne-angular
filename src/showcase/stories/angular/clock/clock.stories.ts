import { SbbClock } from '@sbb-esta/lyne-angular/clock';
import type { SbbTime } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import type { ArgTypes, InputType } from '@storybook/types';

const hours: InputType = { control: { type: 'number', min: 0, max: 23 } };
const minutes: InputType = { control: { type: 'number', min: 0, max: 59 } };
// Note: SBB Clock doesn't have the second 59, this is awaited in still position always
const seconds: InputType = { control: { type: 'number', min: 0, max: 58 } };

const argTypes: ArgTypes = {
  hours,
  minutes,
  seconds,
  now: { table: { disable: true } },
};

const args: Args = {
  hours: undefined,
  minutes: undefined,
  seconds: undefined,
};

const Template = ({ hours, minutes, seconds, ...args }: Args): string => {
  const timeString: SbbTime = `${hours}:${minutes}:${seconds}`;
  const hasCustomTime = hours !== undefined && minutes !== undefined && seconds !== undefined;
  return `
    <div style='max-width: 600px;'>
      <sbb-clock ${hasCustomTime ? `now=${timeString}` : ''} ${argsToTemplate(args)}></sbb-clock>
    </div>
`;
};

const meta: Meta = {
  title: 'elements/sbb-clock',
  component: SbbClock,
  argTypes,
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: Template({ ...args }),
  }),
};
export default meta;

export const Default = {};

export const Paused = {
  args: { ...args, hours: 9, minutes: 10, seconds: 30 },
};
