import { SbbAccordion } from '@sbb-esta/lyne-angular/accordion';
import { SbbExpansionPanel } from '@sbb-esta/lyne-angular/expansion-panel/expansion-panel';
import { SbbExpansionPanelContent } from '@sbb-esta/lyne-angular/expansion-panel/expansion-panel-content';
import { SbbExpansionPanelHeader } from '@sbb-esta/lyne-angular/expansion-panel/expansion-panel-header';
import { withActions } from '@storybook/addon-actions/decorator';
import { Meta, moduleMetadata } from '@storybook/angular';
import { InputType } from '@storybook/types';

import { spreadArgs } from '../../../tools/spread-args';

const color: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['white', 'milk'],
  table: {
    category: 'Panel',
  },
};

const expanded: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Panel',
  },
};

const borderless: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Panel',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Panel',
  },
};

const argTypes = {
  color,
  expanded,
  borderless,
  disabled,
};

const args = {
  color: color.options![0],
  expanded: false,
  borderless: false,
  disabled: false,
};

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbExpansionPanel, SbbExpansionPanelHeader, SbbExpansionPanelContent],
    }),
  ],
  title: 'elements/sbb-accordion',
  component: SbbAccordion,
  parameters: {
    actions: { handles: ['click'] },
  },
  argTypes,
  args,
  // render via template is needed due to the directive implementation
  render: ({ color, expanded, borderless, disabled, ...args }) => ({
    props: { color, expanded, borderless, disabled, ...args },
    template: `
      <sbb-accordion ${spreadArgs(args)}>
        <sbb-expansion-panel
          color=${color}
          expanded=${expanded}
          borderless=${borderless}
          disabled=${!!disabled}>
          <sbb-expansion-panel-header>Header</sbb-expansion-panel-header>
          <sbb-expansion-panel-content>Content</sbb-expansion-panel-content>
        </sbb-expansion-panel>
        <sbb-expansion-panel
          color=${color}
          expanded=${expanded}
          borderless=${borderless}
          disabled=${!!disabled}>
          <sbb-expansion-panel-header>Header 2</sbb-expansion-panel-header>
          <sbb-expansion-panel-content>Content 2</sbb-expansion-panel-content>
        </sbb-expansion-panel>
      </sbb-accordion>
    `,
  }),
};
export default meta;

export const Default = {};
