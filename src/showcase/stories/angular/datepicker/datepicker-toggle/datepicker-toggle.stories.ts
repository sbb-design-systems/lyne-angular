import { SbbDateInput } from '@sbb-esta/lyne-angular/date-input';
import { SbbDatepicker } from '@sbb-esta/lyne-angular/datepicker/datepicker';
import { SbbDatepickerToggle } from '@sbb-esta/lyne-angular/datepicker/datepicker-toggle';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field/form-field';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, argsToTemplate, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType, StoryContext } from '@storybook/types';

const datepicker: InputType = {
  control: false,
  table: {
    disable: true,
  },
};

const view: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['day', 'month', 'year'],
};

const argTypes: ArgTypes = {
  datepicker,
  view,
};

const args: Args = {
  view: view.options![0],
  negative: false,
};

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbFormField, SbbDatepicker, SbbDateInput],
    }),
  ],
  title: 'elements/sbb-datepicker/sbb-datepicker-toggle',
  component: SbbDatepickerToggle,
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
        <sbb-datepicker-toggle ${argsToTemplate(args)}></sbb-datepicker-toggle>
        <sbb-datepicker></sbb-datepicker>
      </sbb-form-field>
    `,
  }),
};
export default meta;

export const Default = {};
