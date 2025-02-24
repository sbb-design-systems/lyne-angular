import { SbbFormField } from '@sbb-esta/lyne-angular/form-field/form-field';
import { SbbOptGroup } from '@sbb-esta/lyne-angular/option/optgroup';
import { SbbOption } from '@sbb-esta/lyne-angular/option/option';
import { SbbSelect } from '@sbb-esta/lyne-angular/select';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, argsToTemplate, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType, StoryContext } from '@storybook/types';

const createOptions = (
  disableOption: boolean,
  group: string,
  selectValue: string | undefined = undefined,
): string => {
  return new Array(3)
    .fill(null)
    .map((_, i) => {
      const value = `Option ${i + 1} - ${group}`;
      const selected = Array.isArray(selectValue)
        ? selectValue.includes(value)
        : selectValue === value;
      return `
      <sbb-option value="${value}" [disabled]=${disableOption && i < 1} [selected]=${selected}>
        ${value}
      </sbb-option>
    `;
    })
    .join('');
};

const borderless: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form field',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's'],
  table: {
    category: 'Form field',
  },
};

const negative: InputType = {
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

const value: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['Option 1 - 2', 'Option 2 - 1'],
};

const disableOption: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Option',
  },
};

const disableGroup: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Option group',
  },
};

const argTypes: ArgTypes = {
  borderless,
  size,
  negative,
  floatingLabel,
  value,
  disableOption,
  disableGroup,
};

const args: Args = {
  borderless: false,
  size: size.options![0],
  negative: false,
  floatingLabel: false,
  value: undefined,
  disableOption: false,
  disableGroup: false,
};

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbFormField, SbbOptGroup, SbbOption],
    }),
  ],
  title: 'elements/sbb-select',
  component: SbbSelect,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: ({
    borderless,
    size,
    negative,
    floatingLabel,
    disableOption,
    disableGroup,
    ...args
  }: Args) => ({
    props: { borderless, size, negative, floatingLabel, disableOption, disableGroup, ...args },
    template: `
      <sbb-form-field
        borderless=${borderless}
        size=${size}
        [negative]=${negative}
        [floating-label]=${floatingLabel}
      >
        <label>Select</label>
        <sbb-select ${argsToTemplate(args)}>
          <sbb-optgroup label="Group 1" disabled=${disableGroup}>
            ${createOptions(disableOption, '1', args['value'])}
          </sbb-optgroup>
          <sbb-optgroup label="Group 2">
            ${createOptions(disableOption, '2', args['value'])}
          </sbb-optgroup>
        </sbb-select>
      </sbb-form-field>`,
  }),
};
export default meta;

export const Default = {};
