import { SbbCardBadge } from '@sbb-esta/lyne-angular/card/card-badge';
import { SbbCheckboxPanel } from '@sbb-esta/lyne-angular/checkbox/checkbox-panel';
import { SbbIcon } from '@sbb-esta/lyne-angular/icon';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, argsToTemplate, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

const label: InputType = {
  control: {
    type: 'text',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's'],
};

const color: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['white', 'milk'],
};

const value: InputType = {
  control: {
    type: 'text',
  },
};

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

const argTypes: ArgTypes = {
  label,
  size,
  color,
  value,
  ariaLabel,
};

const args: Args = {
  label: 'Label',
  size: size.options![0],
  color: color.options![0],
};

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbIcon, SbbCardBadge],
    }),
  ],
  title: 'elements/sbb-checkbox/sbb-checkbox-panel',
  component: SbbCheckboxPanel,
  parameters: {
    actions: { handles: ['click'] },
  },
  argTypes,
  args,
  render: ({ label, ariaLabel, color, ...args }: Args) => ({
    props: { label, ariaLabel, color, ...args },
    template: `
      <sbb-checkbox-panel ${argsToTemplate(args)} [color]="color" ${ariaLabel ? `aria-label="${ariaLabel}"` : ''}>
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
      </sbb-checkbox-panel>
    `,
  }),
};
export default meta;

export const Default = {};
