import { SbbButton } from '@sbb-esta/lyne-angular/button/button';
import { SbbTooltip, SbbTooltipDirective } from '@sbb-esta/lyne-angular/tooltip';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import type { ArgTypes, InputType } from 'storybook/internal/types';

const trigger: InputType = {
  control: false,
  table: {
    disable: true,
  },
};

const position: InputType = {
  options: [
    'block-end',
    'block-start',
    'inline-start',
    'inline-end',
    'bottom',
    'top',
    'left',
    'right',
  ],
  control: {
    type: 'select',
  },
};

const openDelay: InputType = {
  control: {
    type: 'number',
  },
};

const closeDelay: InputType = {
  control: {
    type: 'number',
  },
};

const sbbTooltip: InputType = {
  control: {
    type: 'text',
  },
};

const attributeUsageArgTypes: ArgTypes = {
  'sbb-tooltip': sbbTooltip,
  'sbb-tooltip-open-delay': openDelay,
  'sbb-tooltip-close-delay': closeDelay,
  'sbb-tooltip-position': position,
  openDelay: { control: false, table: { disable: true } },
  closeDelay: { control: false, table: { disable: true } },
  longPressCloseDelay: { control: false, table: { disable: true } },
};

const attributeUsageArgs: Args = {
  'sbb-tooltip': "I'm a tooltip from the [sbb-tooltip] attribute",
  'sbb-tooltip-open-delay': null,
  'sbb-tooltip-close-delay': null,
  'sbb-tooltip-position': position.options![0],
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbButton, SbbTooltipDirective],
    }),
  ],
  title: 'elements/sbb-tooltip',
  component: SbbTooltip,
};
export default meta;

export const Default = {
  argTypes: { position, trigger },
  args: { position: position.options![0] },
  render: ({ position, ...args }: Args) => ({
    props: { position, ...args },
    template: `
      <sbb-button id="tooltip-trigger" style="margin-block-start: 10rem; margin-inline-start: 10rem;">Button</sbb-button>
      <sbb-tooltip trigger="tooltip-trigger" ${argsToTemplate(args)} [ngStyle]="{ '--sbb-overlay-position-area': position }"> I'm a tooltip!!! </sbb-tooltip>`,
  }),
};

export const AttributeUsage = {
  argTypes: { trigger, ...attributeUsageArgTypes },
  args: { ...attributeUsageArgs },
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-button style="margin-block-start: 10rem; margin-inline-start: 10rem;" ${argsToTemplate(args)}>Button</sbb-button>`,
  }),
};
