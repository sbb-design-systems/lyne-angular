import { SbbTimetableFormSwapButton } from '@sbb-esta/lyne-angular/timetable-form';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
  title: 'elements/sbb-timetable-form/sbb-timetable-form-swap-button',
  component: SbbTimetableFormSwapButton,
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-timetable-form-swap-button ${argsToTemplate(args)}></sbb-timetable-form-swap-button>`,
  }),
};
export default meta;

export const Default = {};
