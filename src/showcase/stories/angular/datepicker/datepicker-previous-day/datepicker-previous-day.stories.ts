import { SbbDateInput } from '@sbb-esta/lyne-angular/date-input';
import { SbbDatepicker } from '@sbb-esta/lyne-angular/datepicker/datepicker';
import { SbbDatepickerPreviousDay } from '@sbb-esta/lyne-angular/datepicker/datepicker-previous-day';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field/form-field';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';
import type { ArgTypes, InputType, StoryContext } from 'storybook/internal/types';

const type: InputType = {
  control: false,
  table: { disable: true },
};

const value: InputType = {
  control: false,
  table: { disable: true },
};

const form: InputType = {
  control: false,
  table: { disable: true },
};

const name: InputType = {
  control: false,
  table: { disable: true },
};

const datepicker: InputType = {
  control: false,
  table: { disable: true },
};

const datePicker: InputType = {
  control: false,
  table: { disable: true },
};

const argTypes: ArgTypes = {
  type,
  value,
  form,
  name,
  datepicker,
  datePicker,
};

const args: Args = {
  negative: false,
};

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbFormField, SbbDatepicker, SbbDateInput],
    }),
  ],
  title: 'elements/sbb-datepicker/sbb-datepicker-previous-day',
  component: SbbDatepickerPreviousDay,
  parameters: {
    actions: { handles: ['click'] },
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: ({ negative, ...args }: Args) => ({
    props: { negative, ...args },
    template: `
      <sbb-form-field [negative]="negative">
        <sbb-date-input value="2023-02-15"></sbb-date-input>
        <sbb-datepicker-previous-day ${argsToTemplate(args)}></sbb-datepicker-previous-day>
        <sbb-datepicker></sbb-datepicker>
      </sbb-form-field>
  `,
  }),
};
export default meta;

export const Default = {};
