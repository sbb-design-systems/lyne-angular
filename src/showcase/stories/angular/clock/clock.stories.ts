import { SbbClock } from '@sbb-esta/lyne-angular/clock';
import { SbbTime } from '@sbb-esta/lyne-elements/core/interfaces.js';
import { Args, Meta } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

import { spreadArgs } from '../../../tools/spread-args';

const hours: InputType = { control: { type: 'number', min: 0, max: 23 } };
const minutes: InputType = { control: { type: 'number', min: 0, max: 59 } };
// Note: SBB Clock doesn't have the second 59, this is awaited in still position always
const seconds: InputType = { control: { type: 'number', min: 0, max: 58 } };

const argTypes: ArgTypes = {
  hours,
  minutes,
  seconds,
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
      <sbb-clock now=${hasCustomTime ? timeString : null} ${spreadArgs(args)}></sbb-clock>
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
