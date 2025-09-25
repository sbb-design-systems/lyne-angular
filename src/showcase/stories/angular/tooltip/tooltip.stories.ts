import { SbbButton } from '@sbb-esta/lyne-angular/button/button';
import { SbbTooltip } from '@sbb-esta/lyne-angular/tooltip';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import type { InputType } from 'storybook/internal/types';

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

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbButton],
    }),
  ],
  title: 'elements/sbb-tooltip',
  component: SbbTooltip,
  argTypes: { tooltipPosition, trigger },
  args: { tooltipPosition: tooltipPosition.options![0] },
  render: ({ tooltipPosition, ...args }: Args) => ({
    props: { tooltipPosition, ...args },
    template: `
      <sbb-button id="tooltip-trigger" style="position: absolute; ${tooltipPosition}">Button</sbb-button>
      <sbb-tooltip trigger="tooltip-trigger" ${argsToTemplate(args)}> I'm a tooltip!!! </sbb-tooltip>`,
  }),
};
export default meta;

export const Default = {};
