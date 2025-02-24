import { SbbToggle } from '@sbb-esta/lyne-angular/toggle/toggle';
import { SbbToggleOption } from '@sbb-esta/lyne-angular/toggle/toggle-option';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, argsToTemplate, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's'],
};

const label: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Toggle Option',
  },
};

const labelTwo: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Toggle Option',
  },
};

const iconName: InputType = {
  control: {
    type: 'select',
  },
  options: [null, 'arrow-right-small', 'app-icon-small', 'train-small', 'swisspass-small'],
  table: {
    category: 'Toggle Option',
  },
};

const argTypes: ArgTypes = {
  size,
  label,
  labelTwo,
  iconName,
};

const args: Args = {
  size: size.options![0],
  label: 'Bern',
  labelTwo: 'Zürich',
  iconName: iconName.options![0],
};

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbToggleOption],
    }),
  ],
  title: 'elements/sbb-toggle/sbb-toggle',
  component: SbbToggle,
  parameters: {
    actions: { handles: ['click'] },
  },
  argTypes,
  args,
  render: ({ iconName, label, labelTwo, ...args }: Args) => ({
    props: { iconName, label, labelTwo, ...args },
    template: `
    <sbb-toggle ${argsToTemplate(args)}>
      <sbb-toggle-option ${iconName ? `icon-name="${iconName}"` : ''} value="Value 1">
        ${label}
      </sbb-toggle-option>
      <sbb-toggle-option ${iconName ? `icon-name="arrows-right-left-small"` : ''} value="Value 2">
        ${labelTwo}
      </sbb-toggle-option>
    </sbb-toggle>
    `,
  }),
};
export default meta;

export const Default = {};
