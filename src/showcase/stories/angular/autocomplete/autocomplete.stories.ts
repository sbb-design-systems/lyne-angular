import { SbbAutocomplete } from '@sbb-esta/lyne-angular/autocomplete';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field/form-field';
import { SbbOptGroup } from '@sbb-esta/lyne-angular/option/optgroup';
import { SbbOption } from '@sbb-esta/lyne-angular/option/option';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType, StoryContext } from '@storybook/types';

import { spreadArgs } from '../../../tools/spread-args';

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input',
  },
};

const readonly: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input',
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

const floatingLabel: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form field',
  },
};

const argTypes: ArgTypes = {
  negative,
  disabled,
  readonly,
  borderless,
  size,
  floatingLabel,
};

const args: Args = {
  negative: false,
  disabled: false,
  readonly: false,
  borderless: false,
  size: size.options![0],
  floatingLabel: false,
};

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbFormField, SbbOptGroup, SbbOption],
    }),
  ],
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
  },
  title: 'elements/sbb-autocomplete',
  component: SbbAutocomplete,
  argTypes,
  args,
  // render via template is needed due to the directive implementation
  render: ({ negative, borderless, floatingLabel, size, disabled, readonly, ...args }) => ({
    props: { negative, borderless, floatingLabel, size, disabled, readonly, ...args },
    template: `
      <sbb-form-field [negative]=${negative} [borderless]=${borderless} [floating-label]=${floatingLabel} size=${size}>
        <label>Label</label>
        <input [disabled]=${disabled} [readonly]=${readonly} />
        <sbb-autocomplete ${spreadArgs(args)}>
          <sbb-opt-group label="Group 1">
            <sbb-option value="1">1</sbb-option>
            <sbb-option value="2">2</sbb-option>
          </sbb-opt-group>
          <sbb-opt-group label="Group 2">
            <sbb-option value="3">3</sbb-option>
            <sbb-option value="4">4</sbb-option>
          </sbb-opt-group>
        </sbb-autocomplete>
      </sbb-form-field>
    `,
  }),
};
export default meta;

export const Default = {};
