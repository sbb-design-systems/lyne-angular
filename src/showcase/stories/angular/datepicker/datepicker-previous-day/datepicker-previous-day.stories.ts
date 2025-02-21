import { SbbDatepicker } from '@sbb-esta/lyne-angular/datepicker/datepicker';
import { SbbDatepickerPreviousDay } from '@sbb-esta/lyne-angular/datepicker/datepicker-previous-day';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field/form-field';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, Meta, moduleMetadata } from '@storybook/angular';

import { spreadArgs } from '../../../../helpers/spread-args';

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbFormField, SbbDatepicker],
    }),
  ],
  title: 'elements/sbb-datepicker/sbb-datepicker-previous-day',
  component: SbbDatepickerPreviousDay,
  parameters: {
    actions: { handles: ['click'] },
  },
  args: { negative: false },
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-form-field negative=${args['negative']}>
        <input value="15.02.2023" />
        <sbb-datepicker-previous-day ${spreadArgs(args)}></sbb-datepicker-previous-day>
        <sbb-datepicker></sbb-datepicker>
      </sbb-form-field>
  `,
  }),
};
export default meta;

export const Default = {};
