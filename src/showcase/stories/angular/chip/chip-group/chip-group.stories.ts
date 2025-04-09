import { SbbChip } from '@sbb-esta/lyne-angular/chip/chip';
import { SbbChipGroup } from '@sbb-esta/lyne-angular/chip/chip-group';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field/form-field';
import { Args, argsToTemplate, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType, StoryContext } from '@storybook/types';

const readonly: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input field',
  },
};

const disabledInput: InputType = {
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

const separatorKeys: InputType = {
  control: {
    type: 'text',
  },
};

const value: InputType = {
  control: false,
  table: { disable: true },
};

const name: InputType = {
  control: false,
  table: { disable: true },
};

const required: InputType = {
  control: false,
  table: { disable: true },
};

const argTypes: ArgTypes = {
  readonly,
  disabledInput,
  size,
  hiddenLabel,
  floatingLabel,
  separatorKeys,
  value,
  name,
  required,
};

const args: Args = {
  readonly: false,
  disabledInput: false,
  disabled: false,
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
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: ({
    negative,
    size,
    hiddenLabel,
    floatingLabel,
    readonly,
    disabledInput,
    ...args
  }: Args) => ({
    props: { negative, size, hiddenLabel, floatingLabel, readonly, disabledInput, ...args },
    template: `
      <sbb-form-field
        [negative]="negative"
        [size]="size"
        [hiddenLabel]="hiddenLabel"
        [floatingLabel]="floatingLabel"
      >
        <label>Label</label>
        <sbb-chip-group ${argsToTemplate(args)}>
          <sbb-chip value="chip 1"></sbb-chip>
          <sbb-chip value="chip 2"></sbb-chip>
          <sbb-chip value="chip 3"></sbb-chip>
          <input placeholder="Placeholder" [disabled]="disabledInput" [readonly]="readonly" />
        </sbb-chip-group>
      </sbb-form-field>
    `,
  }),
};
export default meta;

export const Default = {};
