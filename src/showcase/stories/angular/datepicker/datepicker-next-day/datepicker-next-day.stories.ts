import { SbbDateInput } from '@sbb-esta/lyne-angular/date-input';
import { SbbDatepicker, SbbDatepickerNextDay } from '@sbb-esta/lyne-angular/datepicker';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field';
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
  title: 'elements/sbb-datepicker/sbb-datepicker-next-day',
  component: SbbDatepickerNextDay,
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
        <sbb-datepicker></sbb-datepicker>
        <sbb-datepicker-next-day ${argsToTemplate(args)}></sbb-datepicker-next-day>
      </sbb-form-field>
  `,
  }),
};
export default meta;

export const Default = {};
