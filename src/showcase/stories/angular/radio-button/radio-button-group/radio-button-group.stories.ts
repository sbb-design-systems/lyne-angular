import { SbbCardBadge } from '@sbb-esta/lyne-angular/card/card-badge';
import { SbbIcon } from '@sbb-esta/lyne-angular/icon';
import { SbbRadioButton } from '@sbb-esta/lyne-angular/radio-button/radio-button';
import { SbbRadioButtonGroup } from '@sbb-esta/lyne-angular/radio-button/radio-button-group';
import { SbbRadioButtonPanel } from '@sbb-esta/lyne-angular/radio-button/radio-button-panel';
import { Args, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

import { spreadArgs } from '../../../../tools/spread-args';

const suffixAndSubtext = (): string => `
  <span slot="subtext">Subtext</span>
  <span slot="suffix" style="display: flex; align-items: center; margin-inline-start: auto;">
    <sbb-icon name="diamond-small" style="margin-inline: var(--sbb-spacing-fixed-2x);"></sbb-icon>
    <span class="sbb-text-m sbb-text--bold">CHF 40.00</span>
  </span>
  <sbb-card-badge>%</sbb-card-badge>
`;

const DefaultTemplate = (args: Args): string => `
  <sbb-radio-button-group ${spreadArgs(args)}>
    <sbb-radio-button value="Value one">Value one</sbb-radio-button>
    <sbb-radio-button value="Value two">Value two</sbb-radio-button>
    <sbb-radio-button value="Value three" disabled> Value three </sbb-radio-button>
    <sbb-radio-button value="Value four">Value four</sbb-radio-button>
  </sbb-radio-button-group>
`;

const PanelTemplate = (args: Args): string => `
  <sbb-radio-button-group ${spreadArgs(args)}>
    <sbb-radio-button-panel value="Value one">
      Value 1 ${suffixAndSubtext()}
    </sbb-radio-button-panel>
    <sbb-radio-button-panel value="Value two">
      Value 2 ${suffixAndSubtext()}
    </sbb-radio-button-panel>
    <sbb-radio-button-panel value="Value three">
      Value 3 ${suffixAndSubtext()}
    </sbb-radio-button-panel>
  </sbb-radio-button-group>
`;

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
  options: ['unset', 'zero', 'micro', 'small', 'medium', 'large', 'wide', 'ultra'],
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's', 'xs'],
};

const argTypes: ArgTypes = {
  orientation,
  'horizontal-from': horizontalFrom,
  size,
};

const args: Args = {
  value: 'Value two',
  orientation: orientation.options![0],
  'horizontal-from': undefined,
  size: size.options![0],
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbIcon, SbbCardBadge, SbbRadioButton, SbbRadioButtonPanel],
    }),
  ],
  title: 'elements/sbb-radio-button/sbb-radio-button-group',
  component: SbbRadioButtonGroup,
  argTypes,
  args,
};
export default meta;

export const Default = {
  render: (args: Args) => ({
    props: { ...args },
    template: DefaultTemplate(args),
  }),
};

export const Panel = {
  render: (args: Args) => ({
    props: { ...args },
    template: PanelTemplate(args),
  }),
};
