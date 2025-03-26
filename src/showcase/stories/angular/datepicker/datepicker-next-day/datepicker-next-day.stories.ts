import { SbbDateInput } from '@sbb-esta/lyne-angular/date-input';
import { SbbDatepicker } from '@sbb-esta/lyne-angular/datepicker/datepicker';
import { SbbDatepickerNextDay } from '@sbb-esta/lyne-angular/datepicker/datepicker-next-day';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field/form-field';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, argsToTemplate, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType, StoryContext } from '@storybook/types';

const type: InputType = {
  control: {
    type: 'select',
  },
  options: ['button', 'reset', 'submit'],
};

const value: InputType = {
  control: {
    type: 'text',
  },
};

const datepicker: InputType = {
  control: false,
  table: {
    disable: true,
  },
};

const datePicker: InputType = {
  control: false,
  table: {
    disable: true,
  },
};

const argTypes: ArgTypes = {
  type,
  value,
  datepicker,
  datePicker,
};

const args: Args = {
  type: type.options![0],
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
