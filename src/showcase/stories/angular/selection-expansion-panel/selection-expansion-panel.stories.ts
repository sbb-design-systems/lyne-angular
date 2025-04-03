import { SbbCardBadge } from '@sbb-esta/lyne-angular/card/card-badge';
import { SbbCheckboxGroup } from '@sbb-esta/lyne-angular/checkbox/checkbox-group';
import { SbbCheckboxPanel } from '@sbb-esta/lyne-angular/checkbox/checkbox-panel';
import { SbbIcon } from '@sbb-esta/lyne-angular/icon';
import { SbbBlockLinkButton } from '@sbb-esta/lyne-angular/link/block-link-button';
import { SbbRadioButtonGroup } from '@sbb-esta/lyne-angular/radio-button/radio-button-group';
import { SbbRadioButtonPanel } from '@sbb-esta/lyne-angular/radio-button/radio-button-panel';
import { SbbSelectionExpansionPanel } from '@sbb-esta/lyne-angular/selection-expansion-panel';
import { Args, argsToTemplate, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

const cardBadge = (): string => `<sbb-card-badge>%</sbb-card-badge>`;

const suffixAndSubtext = (size: string): string => `
  <span slot="subtext">Subtext</span>
  <span slot="suffix" style="display: flex; align-items: center; margin-inline-start: auto;">
    <sbb-icon name="diamond-small" style="margin-inline: var(--sbb-spacing-fixed-2x);"></sbb-icon>
    <span class=${`sbb-text--bold sbb-text-${size}`}>CHF 40.00</span>
  </span>
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
  <sbb-selection-expansion-panel ${argsToTemplate(args)}>
    <sbb-checkbox-panel [checked]=${checkedInput} [disabled]=${disabledInput}>
      Value one ${suffixAndSubtext(size)} ${cardBadge()}
    </sbb-checkbox-panel>
    ${innerContent()}
  </sbb-selection-expansion-panel>
`;

const WithCheckboxGroupTemplate = ({
  checkedInput,
  disabledInput,
  size,
  ...args
}: Args): string => `
  <sbb-checkbox-group orientation="vertical" horizontalFrom="large" size=${size}>
    <sbb-selection-expansion-panel ${argsToTemplate(args)}>
      <sbb-checkbox-panel [checked]="${checkedInput}">
        Value one ${suffixAndSubtext(size)} ${cardBadge()}
      </sbb-checkbox-panel>
      ${innerContent()}
    </sbb-selection-expansion-panel>

    <sbb-selection-expansion-panel ${argsToTemplate(args)}>
      <sbb-checkbox-panel [disabled]="${disabledInput}">
        Value two ${suffixAndSubtext(size)} ${cardBadge()}
      </sbb-checkbox-panel>
      ${innerContent()}
    </sbb-selection-expansion-panel>

    <sbb-selection-expansion-panel ${argsToTemplate(args)}>
      <sbb-checkbox-panel>
        Value three ${suffixAndSubtext(size)} ${cardBadge()}
      </sbb-checkbox-panel>
      ${innerContent()}
    </sbb-selection-expansion-panel>
  </sbb-checkbox-group>
`;

const WithRadioButtonTemplate = ({ checkedInput, disabledInput, size, ...args }: Args): string => `
  <sbb-selection-expansion-panel ${argsToTemplate(args)}>
    <sbb-radio-button-panel value="Value one" [checked]="${checkedInput}" [disabled]="${disabledInput}">
      Value one ${suffixAndSubtext(size)} ${cardBadge()}
    </sbb-radio-button-panel>
    ${innerContent()}
  </sbb-selection-expansion-panel>
`;

const WithRadioButtonGroupTemplate = ({
  checkedInput,
  disabledInput,
  allowEmptySelection,
  size,
  ...args
}: Args): string => `
  <sbb-radio-button-group
    orientation="vertical"
    horizontal-from="large"
    [allowEmptySelection]=${allowEmptySelection}
    size=${size}
  >
    <sbb-selection-expansion-panel ${argsToTemplate(args)}>
      <sbb-radio-button-panel value="Value one" [checked]="${checkedInput}">
        Value one ${suffixAndSubtext(size)} ${cardBadge()}
      </sbb-radio-button-panel>
      ${innerContent()}
    </sbb-selection-expansion-panel>

    <sbb-selection-expansion-panel ${argsToTemplate(args)}>
      <sbb-radio-button-panel value="Value two" [disabled]="${disabledInput}">
        Value two ${suffixAndSubtext(size)} ${cardBadge()}
      </sbb-radio-button-panel>
      ${innerContent()}
    </sbb-selection-expansion-panel>

    <sbb-selection-expansion-panel ${argsToTemplate(args)}>
      <sbb-radio-button-panel value="Value three">
        Value three ${suffixAndSubtext(size)} ${cardBadge()}
      </sbb-radio-button-panel>
      ${innerContent()}
    </sbb-selection-expansion-panel>
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
  forceOpen: false,
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
      ],
    }),
  ],
  title: 'elements/sbb-selection-expansion-panel',
  component: SbbSelectionExpansionPanel,
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

export const Radio = {
  render: (args: Args) => ({
    props: { ...args },
    template: WithRadioButtonTemplate(args),
  }),
};

export const CheckboxGroup = {
  render: (args: Args) => ({
    props: { ...args, checkedInput: true },
    template: WithCheckboxGroupTemplate({ ...args, checkedInput: true }),
  }),
};

export const RadioGroup = {
  render: (args: Args) => ({
    props: { ...args, checkedInput: true },
    template: WithRadioButtonGroupTemplate({ ...args, checkedInput: true }),
  }),
};
