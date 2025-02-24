import { SbbTrainBlockedPassage } from '@sbb-esta/lyne-angular/train/train-blocked-passage';
import { Args, argsToTemplate, Meta } from '@storybook/angular';

const meta: Meta = {
  title: 'elements/timetable/sbb-train-blocked-passage',
  component: SbbTrainBlockedPassage,
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-train-blocked-passage ${argsToTemplate(args)}></sbb-train-blocked-passage>`,
  }),
};
export default meta;

export const Default = {};
