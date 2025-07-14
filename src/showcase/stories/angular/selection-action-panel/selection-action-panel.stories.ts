import { SbbSecondaryButton } from '@sbb-esta/lyne-angular/button/secondary-button';
import { SbbCardBadge } from '@sbb-esta/lyne-angular/card/card-badge';
import { SbbCheckboxGroup } from '@sbb-esta/lyne-angular/checkbox/checkbox-group';
import { SbbCheckboxPanel } from '@sbb-esta/lyne-angular/checkbox/checkbox-panel';
import { SbbIcon } from '@sbb-esta/lyne-angular/icon';
import { SbbBlockLinkButton } from '@sbb-esta/lyne-angular/link/block-link-button';
import { SbbRadioButtonGroup } from '@sbb-esta/lyne-angular/radio-button/radio-button-group';
import { SbbRadioButtonPanel } from '@sbb-esta/lyne-angular/radio-button/radio-button-panel';
import { SbbSelectionActionPanel } from '@sbb-esta/lyne-angular/selection-action-panel';
import { SbbSelectionExpansionPanel } from '@sbb-esta/lyne-angular/selection-expansion-panel';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import type { ArgTypes, InputType } from 'storybook/internal/types';

const cardBadge = (): string => `<sbb-card-badge>%</sbb-card-badge>`;

const actionButton = (): string => `
  <sbb-secondary-button [size]="size" [disabled]="disabled" icon-name="arrow-right-small">
  </sbb-secondary-button>
`;

const innerContent = (): string => `
  <div slot="content">
    Inner Content
    <sbb-block-link-button icon-name="chevron-small-right-small" icon-placement="end">
      Link
    </sbb-block-link-button>
  </div>
`;

const WithCheckboxTemplate = ({ checkedInput, disabledInput, size, ...args }: Args): string => `
  <sbb-selection-action-panel ${argsToTemplate(args)}>
    <sbb-checkbox-panel [checked]=${checkedInput} [disabled]=${disabledInput} size=${size}>
      Value one
      <span slot="subtext">Subtext</span>
    </sbb-checkbox-panel>
    ${actionButton()}
    ${cardBadge()}
  </sbb-selection-action-panel>
`;

const WithRadioButtonTemplate = ({ checkedInput, disabledInput, size, ...args }: Args): string => `
  <sbb-selection-action-panel ${argsToTemplate(args)}>
    <sbb-radio-button-panel value="Value one" [checked]="${checkedInput}" [disabled]="${disabledInput}" size=${size}>
      Value one
      <span slot="subtext">Subtext</span>
    </sbb-radio-button-panel>
    ${actionButton()}
    ${cardBadge()}
  </sbb-selection-action-panel>
`;

const WithExpansionPanelTemplate = ({
  checkedInput,
  disabledInput,
  size,
  ...args
}: Args): string => `
  <sbb-selection-expansion-panel ${argsToTemplate(args)}>
    ${WithCheckboxTemplate({ checkedInput, disabledInput, size, ...args })}
    ${innerContent()}
  </sbb-selection-expansion-panel>
`;

const WithinGroupTemplate = (args: Args): string => `
  <sbb-radio-button-group
    orientation="vertical"
    horizontal-from="large"
    [size]="size"
  >
    <sbb-selection-action-panel ${argsToTemplate(args)}>
      ${WithRadioButtonTemplate({ ...args, disabledInput: false })}
    </sbb-selection-action-panel>

    <sbb-selection-action-panel ${argsToTemplate(args)}>
      ${WithRadioButtonTemplate({ ...args, checkedInput: false })}
    </sbb-selection-action-panel>

    <sbb-selection-action-panel ${argsToTemplate(args)}>
      ${WithRadioButtonTemplate({ ...args, checkedInput: false })}
    </sbb-selection-action-panel>
  </sbb-radio-button-group>
`;

const color: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['white', 'milk'],
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's'],
  table: {
    category: 'Group / Input',
  },
};

const checkedInput: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Native input',
  },
};

const disabledInput: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Native input',
  },
};

const argTypes: ArgTypes = {
  color,
  size,
  checkedInput,
  disabledInput,
};

const args: Args = {
  color: color.options![0],
  size: size.options![0],
  checkedInput: false,
  disabledInput: false,
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [
        SbbIcon,
        SbbBlockLinkButton,
        SbbCardBadge,
        SbbCheckboxGroup,
        SbbRadioButtonGroup,
        SbbCheckboxPanel,
        SbbRadioButtonPanel,
        SbbSelectionExpansionPanel,
        SbbSecondaryButton,
      ],
    }),
  ],
  title: 'elements/sbb-selection-action-panel',
  component: SbbSelectionActionPanel,
  argTypes,
  args,
};
export default meta;

export const Checkbox = {
  render: (args: Args) => ({
    props: { ...args },
    template: WithCheckboxTemplate(args),
  }),
};

export const RadioButton = {
  render: (args: Args) => ({
    props: { ...args },
    template: WithRadioButtonTemplate(args),
  }),
};

export const WithExpansionPanel = {
  render: (args: Args) => ({
    props: { ...args },
    template: WithExpansionPanelTemplate(args),
  }),
};

export const WithinGroup = {
  render: (args: Args) => ({
    props: { ...args },
    template: WithinGroupTemplate(args),
  }),
};
