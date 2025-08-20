import { SbbFormField } from '@sbb-esta/lyne-angular/form-field/form-field';
import { SbbSlider } from '@sbb-esta/lyne-angular/slider';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import type { ArgTypes, InputType } from 'storybook/internal/types';

const value: InputType = {
  control: {
    type: 'text',
  },
};

const ariaLabel: InputType = {
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

const optional: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field',
  },
};

const valueAsNumber: InputType = {
  control: false,
  table: { disable: true },
};

const name: InputType = {
  control: false,
  table: { disable: true },
};

const argTypes: ArgTypes = {
  value,
  ariaLabel,
  label,
  name,
  optional,
  valueAsNumber,
};

const args: Args = {
  value: '40',
  min: '0',
  max: '100',
  startIcon: 'walk-slow-small',
  endIcon: 'walk-fast-small',
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
      <sbb-form-field [optional]="optional">
        ${label && `<label>${label}</label>`}
        <sbb-slider ${argsToTemplate(args)} name="slider"></sbb-slider>
      </sbb-form-field>
    `,
  }),
};
export default meta;

export const Default = {};
