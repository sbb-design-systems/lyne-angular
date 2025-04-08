import { SbbChip } from '@sbb-esta/lyne-angular/chip/chip';
import { SbbChipGroup } from '@sbb-esta/lyne-angular/chip/chip-group';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field/form-field';
import { Args, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

const readonly: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input field',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'm', 'l'],
  table: {
    category: 'Form field',
  },
};

const hiddenLabel: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form field',
  },
};

const floatingLabel: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form field',
  },
};

const argTypes: ArgTypes = {
  readonly,
  size,
  hiddenLabel,
  floatingLabel,
};

const args: Args = {
  disabled: false,
  readonly: false,
  negative: false,
  size: 'm',
  hiddenLabel: false,
  floatingLabel: false,
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbFormField, SbbChip],
    }),
  ],
  title: 'elements/sbb-chip/sbb-chip-group',
  component: SbbChipGroup,
  argTypes,
  args,
  render: ({ negative, size, hiddenLabel, floatingLabel, disabled, readonly }: Args) => ({
    props: { negative, size, hiddenLabel, floatingLabel, disabled, readonly },
    template: `
      <sbb-form-field
        [negative]=${negative}
        size=${size}
        [hidden-label]=${hiddenLabel}
        [floating-label]=${floatingLabel}
      >
        <label>Label</label>
        <sbb-chip-group>
          <sbb-chip value="chip 1"></sbb-chip>
          <sbb-chip value="chip 2"></sbb-chip>
          <sbb-chip value="chip 3"></sbb-chip>
          <input placeholder="Placeholder" [disabled]=${disabled} [readonly]=${readonly} />
        </sbb-chip-group>
      </sbb-form-field>
    `,
  }),
};
export default meta;

export const Default = {};
