import { SbbAutocomplete } from '@sbb-esta/lyne-angular/autocomplete';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field/form-field';
import { SbbOption } from '@sbb-esta/lyne-angular/option/option';
import { SbbSelect } from '@sbb-esta/lyne-angular/select';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType, StoryContext } from '@storybook/types';

import { spreadArgs } from '../../../../helpers/spread-args';

const createOptions = ({ disabled, value, preserveIconSpace, ...args }: Args): string => {
  const style = preserveIconSpace ? '--sbb-option-icon-container-display: block' : '';
  return [
    ...new Array(5).fill(null).map(
      (_, i) => `
        <sbb-option style="${style}" [disabled]=${disabled && i === 0} value="${value} ${i + 1}" ${spreadArgs(args)}>
          ${value} ${i + 1}
        </sbb-option
        >`,
    ),
    `<sbb-option style="${style}" ${spreadArgs(args)} value="long-value">
        Option Lorem ipsum dolor sit amet.
      </sbb-option>`,
  ].join('');
};

const preserveIconSpace: InputType = {
  control: {
    type: 'boolean',
  },
};

const argTypes: ArgTypes = {
  preserveIconSpace,
};

const args: Args = {
  value: 'Value',
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
      context.args['negative'] ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
};
export default meta;

export const Autocomplete = {
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-form-field [negative]=${args['negative']}>
        <label>sbb-autocomplete</label>
        <input placeholder="Please select." />
        <sbb-autocomplete>${createOptions(args)}</sbb-autocomplete>
      </sbb-form-field>
    `,
  }),
};

export const Select = {
  render: (args: Args) => ({
    props: { ...args },
    template: `
    <sbb-form-field [negative]=${args['negative']}>
      <label>sbb-select</label>
      <sbb-select placeholder="Please select.">${createOptions(args)}</sbb-select>
    </sbb-form-field>
    `,
  }),
};
