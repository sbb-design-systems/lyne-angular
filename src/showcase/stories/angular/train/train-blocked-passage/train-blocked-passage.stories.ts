import { SbbTrainBlockedPassage } from '@sbb-esta/lyne-angular/train/train-blocked-passage';
import { Args, Meta } from '@storybook/angular';

import { spreadArgs } from '../../../../helpers/spread-args';

const meta: Meta = {
  title: 'elements/timetable/sbb-train-blocked-passage',
  component: SbbTrainBlockedPassage,
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-train-blocked-passage ${spreadArgs(args)}></sbb-train-blocked-passage>`,
  }),
};
export default meta;

export const Default = {};
