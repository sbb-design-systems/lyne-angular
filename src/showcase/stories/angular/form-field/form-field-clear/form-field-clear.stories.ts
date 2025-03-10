import { SbbFormField } from '@sbb-esta/lyne-angular/form-field/form-field';
import { SbbFormFieldClear } from '@sbb-esta/lyne-angular/form-field/form-field-clear';
import { SbbIcon } from '@sbb-esta/lyne-angular/icon';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, argsToTemplate, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType, StoryContext } from '@storybook/types';

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Native input',
  },
};

const readonly: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Native input',
  },
};

const type: InputType = {
  control: {
    type: 'select',
  },
  options: ['button', 'reset', 'submit'],
};

const value: InputType = {
  control: {
    type: 'text',
  },
};

const argTypes: ArgTypes = {
  disabled,
  readonly,
  type,
  value,
};

const args: Args = {
  disabled: false,
  readonly: false,
  type: type.options![0],
};

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbFormField, SbbIcon],
    }),
  ],
  title: 'elements/sbb-form-field/sbb-form-field-clear',
  component: SbbFormFieldClear,
  parameters: {
    actions: { handles: ['click'] },
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: ({ type, negative, ...args }: Args) => ({
    props: { type, negative, ...args },
    template: `
      <sbb-form-field [negative]=${negative}>
        <label>Label</label>
        <sbb-icon slot="prefix" name="pie-small"></sbb-icon>
        <input type="text" placeholder="Input placeholder" value="Input value" ${argsToTemplate(args)} />
        <sbb-form-field-clear type=${type} [negative]=${negative}></sbb-form-field-clear>
      </sbb-form-field>
    `,
  }),
};
export default meta;

export const Default = {};
