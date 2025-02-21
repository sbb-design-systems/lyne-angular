import { SbbTrain } from '@sbb-esta/lyne-angular/train/train';
import { Args, Meta } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

import { spreadArgs } from '../../../../helpers/spread-args';

const direction: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['left', 'right'],
  table: {
    category: 'Direction indicator',
  },
};

const directionLabelLevel: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [2, 3, 4, 5, 6],
  table: {
    category: 'Direction indicator',
  },
};

const argTypes: ArgTypes = {
  direction,
  'direction-label-level': directionLabelLevel,
};

const args: Args = {
  'direction-label': 'Direction of travel',
  'accessibility-label':
    'The top of the train is in Sector A. The train leaves the station in this direction',
  station: 'Bern',
  direction: direction.options![0],
  'direction-label-level': directionLabelLevel.options![4],
};

const meta: Meta = {
  title: 'elements/timetable/sbb-train',
  component: SbbTrain,
  argTypes,
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-train ${spreadArgs(args)}></sbb-train>`,
  }),
};
export default meta;

export const Default = {};
