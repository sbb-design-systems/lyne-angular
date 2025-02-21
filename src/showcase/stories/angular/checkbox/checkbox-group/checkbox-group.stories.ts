import { SbbCheckbox } from '@sbb-esta/lyne-angular/checkbox/checkbox';
import { SbbCheckboxGroup } from '@sbb-esta/lyne-angular/checkbox/checkbox-group';
import { breakpoints } from '@sbb-esta/lyne-elements/core/dom.js';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

import { spreadArgs } from '../../../../helpers/spread-args';

const checkboxes = (
  checked: boolean,
  iconName: string,
  iconPlacement: 'start' | 'end',
  label: string,
): string => `
  <sbb-checkbox value="checkbox-1" checked=${checked} icon-name=${iconName} icon-placement=${iconPlacement}>
    ${label} 1
  </sbb-checkbox>
  <sbb-checkbox value="checkbox-2" icon-name=${iconName} icon-placement=${iconPlacement}>
    ${label} 2
  </sbb-checkbox>
  <sbb-checkbox value="checkbox-3" icon-name=${iconName} icon-placement=${iconPlacement}>
    ${label} 3
  </sbb-checkbox>
`;

const checked: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Checkbox',
  },
};

const label: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Checkbox',
  },
};

const iconName: InputType = {
  control: {
    type: 'select',
  },
  options: [undefined, 'dog-small'],
  table: {
    category: 'Checkbox',
  },
};

const iconPlacement: InputType = {
  control: {
    type: 'select',
  },
  options: ['start', 'end'],
  table: {
    category: 'Checkbox',
  },
};

const orientation: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['horizontal', 'vertical'],
  table: {
    category: 'Checkbox group',
  },
};

const horizontalFrom: InputType = {
  control: {
    type: 'select',
  },
  options: [...breakpoints],
  table: {
    category: 'Checkbox group',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's', 'xs'],
  table: {
    category: 'Checkbox group',
  },
};

const argTypes: ArgTypes = {
  label,
  checked,
  iconName,
  iconPlacement,
  orientation,
  'horizontal-from': horizontalFrom,
  size,
};

const args: Args = {
  label: 'Label',
  checked: true,
  iconName: iconName.options![0],
  iconPlacement: undefined,
  orientation: orientation.options![0],
  'horizontal-from': undefined,
  size: size.options![1],
};

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbCheckbox],
    }),
  ],
  title: 'elements/sbb-checkbox/sbb-checkbox-group',
  component: SbbCheckboxGroup,
  parameters: {
    actions: { handles: ['click'] },
  },
  argTypes,
  args,
  render: ({ checked, iconName, iconPlacement, label, ...args }: Args) => ({
    props: { checked, iconName, iconPlacement, label, ...args },
    template: `<sbb-checkbox-group ${spreadArgs(args)}>${checkboxes(checked, iconName, iconPlacement, label)}</sbb-checkbox-group>`,
  }),
};
export default meta;

export const Default = {};
