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

const positions = [
  'inset-inline-start: 2rem;',
  'inset-inline-start: calc(50% - 44px);',
  'inset-inline-end: 2rem;',
  'inset-block-end: 2rem;',
  'inset-inline-start: calc(50% - 44px); inset-block-end: 2rem;',
  'inset-inline-end: 2rem; inset-block-end: 2rem;',
];
const tooltipPosition: InputType = {
  options: Object.keys(positions),
  mapping: positions,
  control: {
    type: 'select',
    labels: {
      0: 'below start',
      1: 'below center',
      2: 'below end',
      3: 'above start',
      4: 'above center',
      5: 'above end',
    },
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
  openDelay: { control: false, table: { disable: true } },
  closeDelay: { control: false, table: { disable: true } },
  longPressCloseDelay: { control: false, table: { disable: true } },
};

const attributeUsageArgs: Args = {
  'sbb-tooltip': "I'm a tooltip from the [sbb-tooltip] attribute",
  'sbb-tooltip-open-delay': null,
  'sbb-tooltip-close-delay': null,
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
  argTypes: { tooltipPosition, trigger },
  args: { tooltipPosition: tooltipPosition.options![0] },
  render: ({ tooltipPosition, ...args }: Args) => ({
    props: { tooltipPosition, ...args },
    template: `
      <sbb-button id="tooltip-trigger" style="position: absolute; ${tooltipPosition}">Button</sbb-button>
      <sbb-tooltip trigger="tooltip-trigger" ${argsToTemplate(args)}> I'm a tooltip!!! </sbb-tooltip>`,
  }),
};

export const AttributeUsage = {
  argTypes: { trigger, ...attributeUsageArgTypes },
  args: { ...attributeUsageArgs },
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-button style='position: absolute' ${argsToTemplate(args)}>Button</sbb-button>`,
  }),
};
