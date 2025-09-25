import { SbbAutocomplete } from '@sbb-esta/lyne-angular/autocomplete';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field';
import { SbbOption } from '@sbb-esta/lyne-angular/option';
import { SbbSelect } from '@sbb-esta/lyne-angular/select';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';
import type { ArgTypes, InputType, StoryContext } from 'storybook/internal/types';

const createOptions = ({ disabled, value, preserveIconSpace, ...args }: Args): string => {
  const style = preserveIconSpace ? '--sbb-option-icon-container-display: block' : '';
  return [
    ...new Array(5).fill(null).map(
      (_, i) => `
        <sbb-option style="${style}" [disabled]=${disabled && i === 0} value="${value} ${i + 1}" ${argsToTemplate(args)}>
          ${value} ${i + 1}
        </sbb-option
        >`,
    ),
    `<sbb-option style="${style}" ${argsToTemplate(args)} value="long-value">
        Option Lorem ipsum dolor sit amet.
      </sbb-option>`,
  ].join('');
};

const preserveIconSpace: InputType = {
  control: {
    type: 'boolean',
  },
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const selected: InputType = {
  control: false,
  table: { disable: true },
};

const argTypes: ArgTypes = {
  preserveIconSpace,
  negative,
  selected,
};

const args: Args = {
  value: 'Value',
  negative: false,
};

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbFormField, SbbAutocomplete, SbbSelect],
    }),
  ],
  title: 'elements/sbb-option/sbb-option',
  component: SbbOption,
  parameters: {
    actions: { handles: ['click'] },
    backgroundColor: (context: StoryContext) =>
      context.args['negative']
        ? 'var(--sbb-background-color-1-negative)'
        : 'var(--sbb-background-color-1)',
  },
  argTypes,
  args,
};
export default meta;

export const Autocomplete = {
  render: ({ negative, ...args }: Args) => ({
    props: { negative, ...args },
    template: `
      <sbb-form-field [negative]='negative'>
        <label>sbb-autocomplete</label>
        <input placeholder="Please select." />
        <sbb-autocomplete>${createOptions({ negative, ...args })}</sbb-autocomplete>
      </sbb-form-field>
    `,
  }),
};

export const Select = {
  render: ({ negative, ...args }: Args) => ({
    props: { negative, ...args },
    template: `
      <sbb-form-field [negative]='negative'>
        <label>sbb-select</label>
        <sbb-select placeholder="Please select.">${createOptions({ negative, ...args })}</sbb-select>
      </sbb-form-field>
    `,
  }),
};
