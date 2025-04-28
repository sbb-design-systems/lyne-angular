import { SbbTimetableRow } from '@sbb-esta/lyne-angular-experimental/timetable-row';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import type { ArgTypes, InputType } from '@storybook/types';

import { convertMillisecondsToSeconds } from '../../../helpers/converter';
import { defaultTrip } from '../../../helpers/timetable-row.sample-data';

const cardActionLabel: InputType = {
  control: {
    type: 'text',
  },
};

const now: InputType = {
  control: {
    type: 'date',
  },
};

const trip: InputType = {
  control: {
    type: 'object',
  },
};

const boarding: InputType = {
  control: {
    type: 'object',
  },
};

const price: InputType = {
  control: {
    type: 'object',
  },
};

const argTypes: ArgTypes = {
  cardActionLabel,
  now,
  trip,
  boarding,
  price,
};

const args: Args = {
  cardActionLabel: '',
  a11yFootpath: false,
  accessibilityExpanded: false,
  active: false,
  disableAnimation: false,
  loadingPrice: false,
  loadingTrip: false,
  now: new Date('2022-12-01T12:11:00').valueOf(),
  trip: defaultTrip,
  boarding: { name: 'sa-rs', text: 'boarding' },
  price: { price: '39.90', text: 'ab CHF', isDiscount: true },
};

const meta: Meta = {
  decorators: [withActions],
  title: 'experimental/sbb-timetable-row',
  component: SbbTimetableRow,
  parameters: {
    actions: { handles: ['click'] },
    backgroundColor: () => 'var(--sbb-color-milk)',
  },
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
    template: `<sbb-timetable-row ${argsToTemplate(args)} [now]="convertMillisecondsToSeconds(now)"></sbb-timetable-row>`,
  }),
};
export default meta;

export const Default = {};
