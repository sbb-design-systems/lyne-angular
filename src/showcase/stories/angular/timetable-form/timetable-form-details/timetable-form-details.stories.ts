import { SbbTimetableFormDetails } from '@sbb-esta/lyne-angular/timetable-form';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      // add slotted components or remove
      imports: [],
    }),
  ],
  title: 'elements/sbb-timetable-form-details',
  component: SbbTimetableFormDetails,
  parameters: {
    // add events or remove the 'action' object
    actions: { handles: ['click'] },
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-timetable-form-details ${argsToTemplate(args)}></sbb-timetable-form-details>`,
  }),
};
export default meta;

export const Default = {};
