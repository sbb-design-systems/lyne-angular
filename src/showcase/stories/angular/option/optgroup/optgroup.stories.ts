import { SbbAutocomplete } from '@sbb-esta/lyne-angular/autocomplete';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field';
import { SbbOptGroup } from '@sbb-esta/lyne-angular/option/optgroup';
import { SbbOption } from '@sbb-esta/lyne-angular/option/option';
import { SbbSelect } from '@sbb-esta/lyne-angular/select';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';
import type { ArgTypes, InputType, StoryContext } from 'storybook/internal/types';

const label: InputType = {
  control: {
    type: 'text',
  },
};

const disabledSingle: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Option',
  },
};

const value: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Option',
  },
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Option',
  },
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const multiple: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Select',
  },
};

const argTypes: ArgTypes = {
  label,
  value,
  iconName,
  negative,
  disabledSingle,
};

const args: Args = {
  label: 'Option group',
  value: 'Option',
  negative: false,
  disabledSingle: false,
};

const createOptions = (
  { disabledSingle, value, iconName, ...args }: Args,
  groupId: string,
): string => {
  return new Array(3)
    .fill(null)
    .map(
      (_, i) => `
        <sbb-option [disabled]=${disabledSingle && i === 0}
                    ${iconName ? '[iconName]="iconName"' : ''}
                    value="${value} ${groupId} - ${i + 1}"
                    ${argsToTemplate(args)}>
          ${value} ${groupId} - ${i + 1}
        </sbb-option>`,
    )
    .join('');
};

const Template = ({ label, disabled, ...args }: Args): string => `
  <sbb-optgroup label="${label} 1" [disabled]=${disabled}> ${createOptions(args, '1')} </sbb-optgroup>
  <sbb-optgroup label="${label} 2" [disabled]=${disabled}> ${createOptions(args, '2')} </sbb-optgroup>
`;

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbFormField, SbbAutocomplete, SbbSelect, SbbOption],
    }),
  ],
  title: 'elements/sbb-option/sbb-optgroup',
  component: SbbOptGroup,
  parameters: {
    actions: { handles: ['click'] },
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
  },
};
export default meta;

export const Autocomplete = {
  argTypes,
  args,
  render: ({ negative, ...args }: Args) => ({
    props: { negative, ...args },
    template: `
      <sbb-form-field [negative]='negative'>
        <label>Autocomplete</label>
        <input placeholder="Placeholder" />
        <sbb-autocomplete>${Template(args)}</sbb-autocomplete>
      </sbb-form-field>
    `,
  }),
};

export const Select = {
  argTypes: { ...argTypes, multiple },
  args: { ...args, multiple: false },
  render: ({ negative, multiple, ...args }: Args) => ({
    props: { negative, multiple, ...args },
    template: `
      <sbb-form-field [negative]='negative'>
        <label>Select</label>
        <sbb-select [multiple]='multiple' placeholder="Select"> ${Template({ negative, ...args })} </sbb-select>
      </sbb-form-field>
    `,
  }),
};
