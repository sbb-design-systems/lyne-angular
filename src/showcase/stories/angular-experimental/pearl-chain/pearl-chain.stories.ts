import { SbbPearlChain } from '@sbb-esta/lyne-angular-experimental/pearl-chain';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import type { ArgTypes, InputType } from 'storybook/internal/types';

import { convertMillisecondsToSeconds } from '../../../helpers/converter';
import {
  cancelledLeg,
  futureLeg,
  longFutureLeg,
  pastLeg,
  progressLeg,
} from '../../../helpers/pearl-chain.sample-data';

const now: InputType = {
  control: {
    type: 'date',
  },
};

const argTypes: ArgTypes = {
  now,
};

const args: Args = {
  legs: [pastLeg, progressLeg, longFutureLeg, cancelledLeg, futureLeg],
  now: new Date('2022-12-05T12:11:00').valueOf(),
};

const meta: Meta = {
  title: 'experimental/sbb-pearl-chain',
  component: SbbPearlChain,
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
      <div style="max-width: 80%;">
        <sbb-pearl-chain ${argsToTemplate(args)} [now]="convertMillisecondsToSeconds(now)"></sbb-pearl-chain>
      </div>
    `,
  }),
};
export default meta;

export const Default = {};
