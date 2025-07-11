import { SbbCardBadge } from '@sbb-esta/lyne-angular/card/card-badge';
import { SbbIcon } from '@sbb-esta/lyne-angular/icon';
import { SbbRadioButtonPanel } from '@sbb-esta/lyne-angular/radio-button/radio-button-panel';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import type { ArgTypes, InputType } from 'storybook/internal/types';

const label: InputType = {
  control: {
    type: 'text',
  },
};

const value: InputType = {
  control: {
    type: 'text',
  },
};

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
};

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

const name: InputType = {
  control: false,
  table: { disable: true },
};

const required: InputType = {
  control: false,
  table: { disable: true },
};

const argTypes: ArgTypes = {
  label,
  value,
  color,
  size,
  ariaLabel,
  name,
  required,
};

const args: Args = {
  label: 'Label',
  value: 'Value',
  color: color.options![0],
  size: size.options![0],
  borderless: false,
  allowEmptySelection: false,
  checked: false,
  disabled: false,
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbIcon, SbbCardBadge],
    }),
  ],
  title: 'elements/sbb-radio-button/sbb-radio-button-panel',
  component: SbbRadioButtonPanel,
  argTypes,
  args,
  render: ({ label, color, ...args }: Args) => ({
    props: { label, color, ...args },
    template: `
      <sbb-radio-button-panel ${argsToTemplate(args)} color="${color}">
        ${label}
        <span slot="subtext">Subtext</span>
        <span slot="suffix" style="margin-inline-start: auto; display:flex; align-items:center;">
          <sbb-icon
            name="diamond-small"
            style="margin-inline: var(--sbb-spacing-fixed-2x);"
            data-namespace="default"
            role="img"
            aria-hidden="true"
          ></sbb-icon>
          <span class="${args['size'] ? `sbb-text-${args['size']}` : 'sbb-text-m'} sbb-text--bold">
            CHF 40.00
          </span>
        </span>
        <sbb-card-badge>%</sbb-card-badge>
      </sbb-radio-button-panel>
    `,
  }),
};
export default meta;

export const Default = {};
