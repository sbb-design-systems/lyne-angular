import { SbbAutocomplete } from '@sbb-esta/lyne-angular/autocomplete';
import { SbbDivider } from '@sbb-esta/lyne-angular/divider';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field';
import { SbbOptGroup, SbbOption, SbbOptionHint } from '@sbb-esta/lyne-angular/option';
import type { Args, Meta } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import type { ArgTypes, InputType, StoryContext } from 'storybook/internal/types';

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const divider: InputType = {
  control: {
    type: 'boolean',
  },
};

const argTypes: ArgTypes = {
  negative,
  divider,
};

const args: Args = {
  negative: false,
  divider: false,
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbAutocomplete, SbbFormField, SbbOptGroup, SbbOption, SbbDivider],
    }),
  ],
  title: 'elements/sbb-option/sbb-option-hint',
  component: SbbOptionHint,
  parameters: {
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
      <sbb-form-field [negative]="negative">
          <label>Label</label>
          <input placeholder="Please select."/>
          <sbb-autocomplete>
            <sbb-option value="1">Value 1</sbb-option>
            <sbb-option value="2">Value 2</sbb-option>
            <sbb-option value="3">Value 3</sbb-option>
            <sbb-option value="4">Value 4</sbb-option>
            ${args['divider'] ? `<sbb-divider></sbb-divider>` : ``}
            <sbb-option-hint>Options hint</sbb-option-hint>
          </sbb-autocomplete>
        </sbb-form-field>
      `,
  }),
};

export const AutocompleteWithGroup = {
  args: { ...args, divider: true },
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-form-field [negative]="negative">
          <label>Label</label>
          <input placeholder="Please select."/>
          <sbb-autocomplete preserve-icon-space>
            <sbb-optgroup label="Group 1">
              <sbb-option icon-name="clock-small" value="1">Value 1</sbb-option>
              <sbb-option icon-name="clock-small" value="2">Value 2</sbb-option>
              <sbb-option-hint>Group 1 hint</sbb-option-hint>
            </sbb-optgroup>
            <sbb-optgroup label="Group 2">
              <sbb-option value="3">Value 3</sbb-option>
              <sbb-option value="4">Value 4</sbb-option>
            </sbb-optgroup>
            ${args['divider'] ? `<sbb-divider></sbb-divider>` : ``}
            <sbb-option-hint>Options hint</sbb-option-hint>
          </sbb-autocomplete>
        </sbb-form-field>
      `,
  }),
};
