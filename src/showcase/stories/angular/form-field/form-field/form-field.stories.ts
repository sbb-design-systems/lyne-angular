import { SbbFormError } from '@sbb-esta/lyne-angular/form-error';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field/form-field';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType, StoryContext } from '@storybook/types';

import { spreadArgs } from '../../../../tools/spread-args';

const inputTemplate = ({ cssClass, ...args }: Record<string, unknown>): string => `
  <input class=${cssClass} ${spreadArgs(args)}/>
`;

const selectTemplate = ({ cssClass, ...args }: Record<string, unknown>): string => `
  <select class=${cssClass} ${spreadArgs(args)}>
    <option value="1">Value 1</option>
    <option value="2">Value 2</option>
    <option value="3">Value 3</option>
  </select>
`;

const textareaTemplate = ({ cssClass, ...args }: Record<string, unknown>): string => `
  <textarea class=${cssClass} ${spreadArgs(args)}></textarea>
`;

const formFieldTemplate = (
  { label, cssClass, ...args }: Record<string, unknown>,
  template: string,
): string => `
  <sbb-form-field ${spreadArgs(args)}>
    ${label && `<label>${label}</label>`}
    ${template}
    <sbb-form-error style="display: ${cssClass ? `flex` : 'none'}">Error</sbb-form-error>
  </sbb-form-field>
`;

const inputStory = ({ placeholder, cssClass, disabled, readonly, value, ...args }: Args): string =>
  formFieldTemplate(
    { cssClass, ...args },
    inputTemplate({ placeholder, cssClass, disabled, readonly, value }),
  );

const selectStory = ({ placeholder, cssClass, disabled, readonly, value, ...args }: Args): string =>
  formFieldTemplate(
    { cssClass, ...args },
    selectTemplate({ placeholder, cssClass, disabled, readonly, value }),
  );

const textareaStory = ({
  placeholder,
  cssClass,
  disabled,
  readonly,
  value,
  ...args
}: Args): string =>
  formFieldTemplate(
    { cssClass, ...args },
    textareaTemplate({ placeholder, cssClass, disabled, readonly, value }),
  );

const placeholder: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Input attribute',
  },
};

const cssClass: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [null, 'sbb-invalid'],
  table: {
    category: 'Input attribute',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input attribute',
  },
};

const readonly: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input attribute',
  },
};

const value: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Input attribute',
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

const argTypes: ArgTypes = {
  label,
  cssClass,
  placeholder,
  disabled,
  readonly,
  value,
};

const args: Args = {
  label: 'Input name',
  cssClass: null,
  placeholder: 'Input placeholder',
  disabled: false,
  readonly: false,
  value: 'Input value',
};

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbFormError],
    }),
  ],
  title: 'elements/sbb-form-field/sbb-form-field',
  component: SbbFormField,
  parameters: {
    actions: { handles: ['change', 'input'] },
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
};
export default meta;

export const Input = {
  render: (args: Record<string, unknown>) => ({
    template: inputStory(args),
  }),
};

export const Select = {
  render: (args: Record<string, unknown>) => ({
    props: { ...args },
    template: selectStory(args),
  }),
};

export const Textarea = {
  render: (args: Record<string, unknown>) => ({
    props: { ...args },
    template: textareaStory(args),
  }),
};
