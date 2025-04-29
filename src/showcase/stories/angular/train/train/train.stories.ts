import { SbbTrain } from '@sbb-esta/lyne-angular/train/train';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import type { ArgTypes, InputType } from '@storybook/types';

const direction: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['left', 'right'],
};

const directionLabelLevel: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [2, 3, 4, 5, 6],
};

const argTypes: ArgTypes = {
  direction,
  directionLabelLevel,
};

const args: Args = {
  directionLabel: 'Direction of travel',
  accessibilityLabel:
    'The top of the train is in Sector A. The train leaves the station in this direction',
  station: 'Bern',
  direction: direction.options![0],
  directionLabelLevel: directionLabelLevel.options![4],
};

const meta: Meta = {
  title: 'elements/timetable/sbb-train',
  component: SbbTrain,
  argTypes,
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-train ${argsToTemplate(args)}></sbb-train>`,
  }),
};
export default meta;

export const Default = {};
