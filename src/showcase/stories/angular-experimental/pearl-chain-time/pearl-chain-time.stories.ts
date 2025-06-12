import { SbbPearlChainTime } from '@sbb-esta/lyne-angular-experimental/pearl-chain-time';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import type { ArgTypes, InputType } from 'storybook/internal/types';

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
  departureWalk,
  arrivalWalk,
  arrivalTime,
  departureTime,
  disableAnimation,
  now,
};

const args: Args = {
  legs: [progressLeg],
  departureWalk: 5,
  arrivalWalk: 10,
  arrivalTime: '2022-12-11T14:11:00',
  departureTime: '2022-12-11T12:11:00',
  disableAnimation: false,
  now: new Date('2022-12-05T12:11:00').valueOf(),
};

const meta: Meta = {
  title: 'experimental/sbb-pearl-chain-time',
  component: SbbPearlChainTime,
  argTypes: {
    ...argTypes,
    convertMillisecondsToSeconds: { type: 'function', control: false, table: { disable: true } },
  },
  args: {
    ...args,
    convertMillisecondsToSeconds: (e: number): number => convertMillisecondsToSeconds(e),
  },
  render: ({ now, ...args }: Args) => ({
    props: { now, ...args },
    template: `
      <div style="max-width: 20rem;">
        <sbb-pearl-chain-time ${argsToTemplate(args)} [now]="convertMillisecondsToSeconds(now)"></sbb-pearl-chain-time>
      </div>
    `,
  }),
};
export default meta;

export const Default = {};
