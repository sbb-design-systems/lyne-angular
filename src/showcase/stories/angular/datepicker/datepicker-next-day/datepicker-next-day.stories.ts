import { SbbDatepicker } from '@sbb-esta/lyne-angular/datepicker/datepicker';
import { SbbDatepickerNextDay } from '@sbb-esta/lyne-angular/datepicker/datepicker-next-day';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field/form-field';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, argsToTemplate, Meta, moduleMetadata } from '@storybook/angular';

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbFormField, SbbDatepicker],
    }),
  ],
  title: 'elements/sbb-datepicker/sbb-datepicker-next-day',
  component: SbbDatepickerNextDay,
  parameters: {
    actions: { handles: ['click'] },
  },
  args: { negative: false },
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-form-field negative=${args['negative']}>
        <input value="15.02.2023" />
        <sbb-datepicker></sbb-datepicker>
        <sbb-datepicker-next-day ${argsToTemplate(args)}></sbb-datepicker-next-day>
      </sbb-form-field>
  `,
  }),
};
export default meta;

export const Default = {};
