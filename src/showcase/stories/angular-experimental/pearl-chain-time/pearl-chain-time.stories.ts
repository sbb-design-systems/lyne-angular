import { SbbPearlChainTime } from '@sbb-esta/lyne-angular-experimental/pearl-chain-time';
import { Args, argsToTemplate, Meta } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

import { convertMillisecondsToSeconds } from '../../../helpers/converter';
import { progressLeg } from '../../../helpers/pearl-chain.sample-data';

const departureWalk: InputType = {
  control: {
    type: 'number',
  },
};

const arrivalWalk: InputType = {
  control: {
    type: 'number',
  },
};

const departureTime: InputType = {
  control: {
    type: 'text',
  },
};

const arrivalTime: InputType = {
  control: {
    type: 'text',
  },
};

const disableAnimation: InputType = {
  control: {
    type: 'boolean',
  },
};

const now: InputType = {
  control: {
    type: 'date',
  },
};

const argTypes: ArgTypes = {
  'departure-walk': departureWalk,
  'arrival-walk': arrivalWalk,
  'arrival-time': arrivalTime,
  'departure-time': departureTime,
  'disable-animation': disableAnimation,
  now,
};

const args: Args = {
  legs: [progressLeg],
  'departure-walk': '5',
  'arrival-walk': '10',
  'arrival-time': '2022-12-11T14:11:00',
  'departure-time': '2022-12-11T12:11:00',
  'disable-animation': false,
  now: new Date('2022-12-05T12:11:00').valueOf(),
};

const meta: Meta = {
  title: 'experimental/sbb-pearl-chain-time',
  component: SbbPearlChainTime,
  argTypes,
  args,
  render: ({ now, ...args }: Args) => ({
    props: { now, ...args },
    template: `
      <div style="max-width: 20rem;">
        <sbb-pearl-chain-time ${argsToTemplate(args)} ${now ? `now=${convertMillisecondsToSeconds(now)}` : ''}></sbb-pearl-chain-time>
      </div>
    `,
  }),
};
export default meta;

export const Default = {};
