import { SbbTimetableFormField } from '@sbb-esta/lyne-angular/timetable-form';
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
  title: 'elements/sbb-timetable-form-field',
  component: SbbTimetableFormField,
  parameters: {
    // add events or remove the 'action' object
    actions: { handles: ['click'] },
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-timetable-form-field ${argsToTemplate(args)}></sbb-timetable-form-field>`,
  }),
};
export default meta;

export const Default = {};
