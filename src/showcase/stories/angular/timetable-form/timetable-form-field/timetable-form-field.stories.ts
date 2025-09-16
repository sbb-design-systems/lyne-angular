import { SbbCard } from '@sbb-esta/lyne-angular/card';
import { SbbTimetableFormField } from '@sbb-esta/lyne-angular/timetable-form';
import type { Args, Meta } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbCard],
    }),
  ],
  title: 'elements/sbb-timetable-form/sbb-timetable-form-field',
  component: SbbTimetableFormField,
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-card color="milk">
        <b>sbb-timetable-form-field</b> is an element meant to be used in combination with the
        'sbb-timetable-form'.
        <p style="margin-block-end: 0">
          See the <b>sbb-timetable-form</b> examples to see it in action.
        </p>
      </sbb-card>
    `,
  }),
};
export default meta;

export const Default = {};
