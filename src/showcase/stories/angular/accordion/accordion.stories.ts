import { SbbAccordion } from '@sbb-esta/lyne-angular/accordion';
import { SbbExpansionPanel } from '@sbb-esta/lyne-angular/expansion-panel/expansion-panel';
import { SbbExpansionPanelContent } from '@sbb-esta/lyne-angular/expansion-panel/expansion-panel-content';
import { SbbExpansionPanelHeader } from '@sbb-esta/lyne-angular/expansion-panel/expansion-panel-header';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import type { InputType, StoryContext } from '@storybook/types';

const titleLevel: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6, null],
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

const headerText: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Header',
  },
};

const contentText: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Content',
  },
};
const argTypes = {
  titleLevel,
  color,
  expanded,
  borderless,
  disabled,
  iconName,
  headerText,
  contentText,
};

const args = {
  titleLevel: titleLevel.options![2],
  color: color.options![0],
  expanded: false,
  borderless: false,
  disabled: false,
  iconName: 'pie-small',
  headerText: 'Header',
  contentText: 'Content',
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
  render: ({
    color,
    expanded,
    borderless,
    disabled,
    iconName,
    headerText,
    contentText,
    ...args
  }: Args) => ({
    props: { color, expanded, borderless, disabled, iconName, headerText, contentText, ...args },
    template: `
      <sbb-accordion ${argsToTemplate(args)}>
        <sbb-expansion-panel
          [color]="color"
          [expanded]="expanded"
          [borderless]="borderless"
          [disabled]="disabled">
          <sbb-expansion-panel-header [iconName]="iconName">${headerText} 1</sbb-expansion-panel-header>
          <sbb-expansion-panel-content>${contentText} 1</sbb-expansion-panel-content>
        </sbb-expansion-panel>
        <sbb-expansion-panel
          [color]="color"
          [expanded]="expanded"
          [borderless]="borderless"
          [disabled]="disabled">
          <sbb-expansion-panel-header [iconName]="iconName">${headerText} 2</sbb-expansion-panel-header>
          <sbb-expansion-panel-content>${contentText} 2</sbb-expansion-panel-content>
        </sbb-expansion-panel>
      </sbb-accordion>
    `,
  }),
};
export default meta;

export const Default = {};
