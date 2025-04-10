import { SbbButton } from '@sbb-esta/lyne-angular/button/button';
import { SbbSecondaryButton } from '@sbb-esta/lyne-angular/button/secondary-button';
import { SbbJourneySummary } from '@sbb-esta/lyne-angular-experimental/journey-summary';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, argsToTemplate, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

import { convertMillisecondsToSeconds } from '../../../helpers/converter';
import { futureLeg, pastLeg, progressLeg } from '../../../helpers/pearl-chain.sample-data';

const headerLevel: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6],
};

const trip: InputType = {
  control: {
    type: 'object',
  },
};

const tripBack: InputType = {
  control: {
    type: 'object',
  },
};

const argTypes: ArgTypes = {
  headerLevel,
  trip,
  tripBack,
};

const args: Args = {
  headerLevel: headerLevel.options![2],
  now: new Date('2022-12-05T12:11:00').valueOf(),
  trip: {
    vias: ['via1', 'via2', 'via3', 'via4'],
    legs: [pastLeg, progressLeg, futureLeg],
    origin: 'Bern',
    destination: 'Basel',
    departure: '2022-09-19T20:30:00+02:00',
    arrival: '2022-09-19T22:30:00+02:00',
    duration: 120,
  },
  tripBack: {
    vias: ['via5', 'via6', 'via7', 'via8'],
    legs: [pastLeg, progressLeg, futureLeg],
    origin: 'Basel',
    destination: 'Bern',
    departure: '2022-09-20T22:30:00+02:00',
    arrival: '2022-09-20T00:30:00+02:00',
    duration: 120,
  },
  roundTrip: true,
  a11yFootpath: false,
  disableAnimation: false,
};

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbButton, SbbSecondaryButton],
    }),
  ],
  title: 'experimental/sbb-journey-summary',
  component: SbbJourneySummary,
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
      <sbb-journey-summary ${argsToTemplate(args)} [now]="convertMillisecondsToSeconds(now)">
        <div style="display: flex; padding-top: 24px; justify-content: space-between;" slot="content">
          <sbb-secondary-button iconName="context-menu-small"></sbb-secondary-button>
          <sbb-button>Button label</sbb-button>
        </div>
      </sbb-journey-summary>
    `,
  }),
};
export default meta;

export const Default = {};
