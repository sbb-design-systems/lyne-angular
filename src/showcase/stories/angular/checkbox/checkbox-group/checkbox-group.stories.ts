import { SbbCardBadge } from '@sbb-esta/lyne-angular/card/card-badge';
import { SbbCheckbox } from '@sbb-esta/lyne-angular/checkbox/checkbox';
import { SbbCheckboxGroup } from '@sbb-esta/lyne-angular/checkbox/checkbox-group';
import { SbbCheckboxPanel } from '@sbb-esta/lyne-angular/checkbox/checkbox-panel';
import { breakpoints } from '@sbb-esta/lyne-elements/core/dom.js';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';
import type { ArgTypes, InputType } from 'storybook/internal/types';

const suffixAndSubtext = (): string => `
  <span slot="subtext">Subtext</span>
  <span slot="suffix" style="margin-inline-start: auto; display:flex; align-items:center;">
    <sbb-icon name="diamond-small" style="margin-inline: var(--sbb-spacing-fixed-2x);" data-namespace="default" role="img" aria-hidden="true"></sbb-icon>
    <span class="${args['size'] ? `sbb-text-${args['size']}` : 'sbb-text-m'} sbb-text--bold">
      CHF 40.00
    </span>
  </span>
  <sbb-card-badge>%</sbb-card-badge>
`;

const PanelTemplate = ({ label, checked, ...args }: Args): string => `
  <sbb-checkbox-group ${argsToTemplate(args)}>
    <sbb-checkbox-panel checked="${checked}" value="Value one">
      ${label} 1 ${suffixAndSubtext()}
    </sbb-checkbox-panel>
    <sbb-checkbox-panel value="Value two">
      ${label} 2 ${suffixAndSubtext()}
    </sbb-checkbox-panel>
    <sbb-checkbox-panel value="Value three">
      ${label} 3 ${suffixAndSubtext()}
    </sbb-checkbox-panel>
  </sbb-checkbox-group>
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
};

const horizontalFrom: InputType = {
  control: {
    type: 'select',
  },
  options: [...breakpoints],
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's', 'xs'],
};

const argTypes: ArgTypes = {
  label,
  checked,
  orientation,
  horizontalFrom,
  size,
};

const args: Args = {
  label: 'Label',
  checked: true,
  orientation: orientation.options![0],
  horizontalFrom: undefined,
  size: size.options![1],
};

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbCheckbox, SbbCheckboxPanel, SbbCardBadge],
    }),
  ],
  title: 'elements/sbb-checkbox/sbb-checkbox-group',
  component: SbbCheckboxGroup,
  parameters: {
    actions: { handles: ['click'] },
  },
  argTypes,
  args,
};
export default meta;

export const Default = {
  argTypes: {
    ...argTypes,
    iconName,
    iconPlacement,
  },
  args: {
    ...args,
    iconName: iconName.options![0],
    iconPlacement: undefined,
  },
  render: ({ checked, iconName, iconPlacement, label, ...args }: Args) => ({
    props: { checked, iconName, iconPlacement, label, ...args },
    template: `
      <sbb-checkbox-group ${argsToTemplate(args)}>
        <sbb-checkbox value="checkbox-1" [checked]="checked" [iconName]="iconName" [iconPlacement]="iconPlacement">
          ${label} 1
        </sbb-checkbox>
        <sbb-checkbox value="checkbox-2" [iconName]="iconName" [iconPlacement]="iconPlacement">
          ${label} 2
        </sbb-checkbox>
        <sbb-checkbox value="checkbox-3" [iconName]="iconName" [iconPlacement]="iconPlacement">
          ${label} 3
        </sbb-checkbox>
      </sbb-checkbox-group>
    `,
  }),
};

export const Panel = {
  render: (args: Args) => ({
    props: { ...args },
    template: PanelTemplate(args),
  }),
};
