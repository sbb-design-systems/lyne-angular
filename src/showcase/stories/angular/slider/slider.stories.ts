import { SbbFormField } from '@sbb-esta/lyne-angular/form-field/form-field';
import { SbbSlider } from '@sbb-esta/lyne-angular/slider';
import { Args, argsToTemplate, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

const value: InputType = {
  control: {
    type: 'text',
  },
};

const label: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Form-field',
  },
};

const valueAsNumber: InputType = {
  control: false,
  table: {
    disable: true,
  },
};

const optional: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field',
  },
};

const argTypes: ArgTypes = {
  value,
  label,
  optional,
  'value-as-number': valueAsNumber,
};

const args: Args = {
  value: '40',
  min: '0',
  max: '100',
  'start-icon': 'walk-slow-small',
  'end-icon': 'walk-fast-small',
  label: 'Label',
  optional: undefined,
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbFormField],
    }),
  ],
  title: 'elements/sbb-slider',
  component: SbbSlider,
  argTypes,
  args,
  render: ({ label, optional, ...args }: Args) => ({
    props: { label, optional, ...args },
    template: `
      <sbb-form-field [optional]=${optional}>
        ${label && `<label>${label}</label>`}
        <sbb-slider ${argsToTemplate(args)} name="slider"></sbb-slider>
      </sbb-form-field>
    `,
  }),
};
export default meta;

export const Default = {};
