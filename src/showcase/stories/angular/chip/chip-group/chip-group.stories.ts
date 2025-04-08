import { SbbChip } from '@sbb-esta/lyne-angular/chip/chip';
import { SbbChipGroup } from '@sbb-esta/lyne-angular/chip/chip-group';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field/form-field';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

const readonly: InputType = {
  table: {
    category: 'Input field',
  },
  control: {
    type: 'boolean',
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
    withActions,
    moduleMetadata({
      // add slotted components or remove
      imports: [SbbFormField, SbbChip],
    }),
  ],
  title: 'elements/sbb-chip/sbb-chip-group',
  component: SbbChipGroup,
  argTypes,
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-form-field
        [negative]=${args['negative']}
        size=${args['size']}
        [hidden-label]=${args['hiddenLabel']}
        [floating-label]=${args['floatingLabel']}
      >
        <label>Label</label>
        <sbb-chip-group>
          <sbb-chip value="chip 1"></sbb-chip>
          <sbb-chip value="chip 2"></sbb-chip>
          <sbb-chip value="chip 3"></sbb-chip>
          <input placeholder="Placeholder" [disabled]=${args['disabled']} [readonly]=${args['readonly']} />
        </sbb-chip-group>
      </sbb-form-field>
    `,
  }),
};
export default meta;

export const Default = {};
