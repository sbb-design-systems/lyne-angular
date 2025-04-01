import { SbbExpansionPanel } from '@sbb-esta/lyne-angular/expansion-panel/expansion-panel';
import { SbbExpansionPanelContent } from '@sbb-esta/lyne-angular/expansion-panel/expansion-panel-content';
import { SbbExpansionPanelHeader } from '@sbb-esta/lyne-angular/expansion-panel/expansion-panel-header';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, argsToTemplate, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

const longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim elit, ultricies in tincidunt
quis, mattis eu quam. Nulla sit amet lorem fermentum, molestie nunc ut, hendrerit risus. Vestibulum rutrum elit et
lacus sollicitudin, quis malesuada lorem vehicula. Suspendisse at augue quis tellus vulputate tempor. Vivamus urna
velit, varius nec est ac, mollis efficitur lorem. Quisque non nisl eget massa interdum tempus. Praesent vel feugiat
metus.`;

const headerText: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Header',
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

const disabledInteractive: InputType = {
  control: {
    type: 'boolean',
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
};

const expanded: InputType = {
  control: {
    type: 'boolean',
  },
};

const borderless: InputType = {
  control: {
    type: 'boolean',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['l', 's'],
};

const argTypes: ArgTypes = {
  headerText,
  iconName,
  contentText,
  expanded,
  titleLevel,
  color,
  borderless,
  disabled,
  disabledInteractive,
  size,
};

const args: Args = {
  headerText: 'Header',
  iconName: undefined,
  contentText: longText,
  expanded: false,
  titleLevel: titleLevel.options![2],
  color: color.options![0],
  borderless: false,
  disabled: false,
  disabledInteractive: false,
  size: size.options![0],
};

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbExpansionPanelHeader, SbbExpansionPanelContent],
    }),
  ],
  title: 'elements/sbb-accordion/sbb-expansion-panel',
  component: SbbExpansionPanel,
  parameters: {
    actions: { handles: ['click'] },
  },
  argTypes,
  args,
  render: ({ headerText, iconName, contentText, disabledInteractive, ...args }: Args) => ({
    props: { headerText, iconName, contentText, disabledInteractive, ...args },
    template: `
      <sbb-expansion-panel ${argsToTemplate(args)}>
        <sbb-expansion-panel-header ${iconName ? `[iconName]='iconName'` : ''} [disabledInteractive]=${disabledInteractive}>
          ${headerText}
        </sbb-expansion-panel-header>
        <sbb-expansion-panel-content>${contentText}</sbb-expansion-panel-content>
      </sbb-expansion-panel>
    `,
  }),
};
export default meta;

export const Default = {};
