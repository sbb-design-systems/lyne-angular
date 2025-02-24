import { SbbAccordion } from '@sbb-esta/lyne-angular/accordion';
import { SbbExpansionPanel } from '@sbb-esta/lyne-angular/expansion-panel/expansion-panel';
import { SbbExpansionPanelContent } from '@sbb-esta/lyne-angular/expansion-panel/expansion-panel-content';
import { SbbExpansionPanelHeader } from '@sbb-esta/lyne-angular/expansion-panel/expansion-panel-header';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, argsToTemplate, Meta, moduleMetadata } from '@storybook/angular';
import { InputType, StoryContext } from '@storybook/types';

const titleLevel: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6, null],
  table: {
    category: 'Accordion',
  },
};

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

const iconName: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Header',
  },
};

const argTypes = {
  'title-level': titleLevel,
  color,
  expanded,
  borderless,
  disabled,
  iconName,
};

const args = {
  'title-level': titleLevel.options![2],
  color: color.options![0],
  expanded: false,
  borderless: false,
  disabled: false,
  iconName: 'pie-small',
};

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbExpansionPanel, SbbExpansionPanelHeader, SbbExpansionPanelContent],
    }),
  ],
  title: 'elements/sbb-accordion/sbb-accordion',
  component: SbbAccordion,
  parameters: {
    actions: { handles: ['click'] },
    backgroundColor: (context: StoryContext) =>
      context.args['borderless'] ? 'var(--sbb-color-cement)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: ({ color, expanded, borderless, disabled, iconName, ...args }: Args) => ({
    props: { color, expanded, borderless, disabled, iconName, ...args },
    template: `
      <sbb-accordion ${argsToTemplate(args)}>
        <sbb-expansion-panel
          color=${color}
          expanded=${expanded}
          borderless=${borderless}
          disabled=${disabled}>
          <sbb-expansion-panel-header icon-name=${iconName}>Header</sbb-expansion-panel-header>
          <sbb-expansion-panel-content>Content</sbb-expansion-panel-content>
        </sbb-expansion-panel>
        <sbb-expansion-panel
          color=${color}
          expanded=${expanded}
          borderless=${borderless}
          disabled=${disabled}>
          <sbb-expansion-panel-header icon-name=${iconName}>Header 2</sbb-expansion-panel-header>
          <sbb-expansion-panel-content>Content 2</sbb-expansion-panel-content>
        </sbb-expansion-panel>
      </sbb-accordion>
    `,
  }),
};
export default meta;

export const Default = {};
