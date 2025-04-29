import { SbbFormError } from '@sbb-esta/lyne-angular/form-error';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field/form-field';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import type { InputType, StoryContext } from '@storybook/types';

const inputStory = ({
  label,
  placeholder,
  cssClass,
  disabled,
  readonly,
  value,
  ...args
}: Args): string => `
  <sbb-form-field ${argsToTemplate(args)}>
    ${label && `<label>${label}</label>`}
    <input ${cssClass ? `class=${cssClass}` : ''} placeholder="${placeholder}" value="${value}" [disabled]=${disabled} [readonly]=${readonly}/>
    <sbb-form-error style="display: ${cssClass ? `flex` : 'none'}">Error</sbb-form-error>
  </sbb-form-field>
`;

const selectStory = ({ label, cssClass, disabled, ...args }: Args): string => `
  <sbb-form-field ${argsToTemplate(args)}>
    ${label && `<label>${label}</label>`}
    <select ${cssClass ? `class=${cssClass}` : ''} [disabled]=${disabled}>
      <option value="1">Value 1</option>
      <option value="2">Value 2</option>
      <option value="3">Value 3</option>
    </select>
    <sbb-form-error style="display: ${cssClass ? `flex` : 'none'}">Error</sbb-form-error>
  </sbb-form-field>
`;

const textareaStory = ({
  label,
  placeholder,
  cssClass,
  disabled,
  readonly,
  value,
  ...args
}: Args): string => `
  <sbb-form-field ${argsToTemplate(args)}>
    ${label && `<label>${label}</label>`}
    <textarea ${cssClass ? `class=${cssClass}` : ''} placeholder="${placeholder}" [disabled]=${disabled} [readonly]=${readonly}>${value || ''}</textarea>
    <sbb-form-error style="display: ${cssClass ? `flex` : 'none'}">Error</sbb-form-error>
  </sbb-form-field>
`;

const placeholder: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Native input',
  },
};

const cssClass: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [null, 'sbb-invalid'],
  table: {
    category: 'Native input',
  },
};

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

const value: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Native input',
  },
};

const label: InputType = {
  control: {
    type: 'text',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'm', 'l'],
};

const width: InputType = {
  control: {
    type: 'select',
  },
  options: ['default', 'collapse'],
};

const errorSpace: InputType = {
  control: {
    type: 'select',
  },
  options: ['none', 'reserve'],
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
  argTypes: {
    size,
    errorSpace,
    width,
  },
  args: {
    size: size.options![1],
    errorSpace: errorSpace.options![0],
    width: width.options![0],
    borderless: false,
    floatingLabel: false,
    hiddenLabel: false,
    negative: false,
    optional: false,
  },
};
export default meta;

export const Input = {
  argTypes: {
    label,
    cssClass,
    placeholder,
    disabled,
    readonly,
    value,
  },
  args: {
    label: 'Input name',
    cssClass: null,
    placeholder: 'Input placeholder',
    disabled: false,
    readonly: false,
    value: 'Input value',
  },
  render: (args: Args) => ({
    props: { ...args },
    template: inputStory(args),
  }),
};

export const Select = {
  argTypes: {
    label,
    cssClass,
    disabled,
  },
  args: {
    label: 'Input name',
    cssClass: null,
    disabled: false,
  },
  render: (args: Args) => ({
    props: { ...args },
    template: selectStory(args),
  }),
};

export const Textarea = {
  argTypes: {
    label,
    cssClass,
    placeholder,
    disabled,
    readonly,
    value,
  },
  args: {
    label: 'Input name',
    cssClass: null,
    placeholder: 'Input placeholder',
    disabled: false,
    readonly: false,
    value: 'Input value',
  },
  render: (args: Args) => ({
    props: { ...args },
    template: textareaStory(args),
  }),
};
