import {
  SbbExpansionPanel,
  SbbExpansionPanelContent,
  SbbExpansionPanelContentDirective,
  SbbExpansionPanelHeader,
} from '@sbb-esta/lyne-angular/expansion-panel';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';
import type { ArgTypes, InputType } from 'storybook/internal/types';

import readme from './readme.md';

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
      imports: [
        SbbExpansionPanelHeader,
        SbbExpansionPanelContent,
        SbbExpansionPanelContentDirective,
      ],
    }),
  ],
  title: 'elements/sbb-accordion/sbb-expansion-panel',
  component: SbbExpansionPanel,
  parameters: {
    actions: { handles: ['click'] },
    docs: {
      description: {
        component: readme,
      },
    },
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

export const LazyLoading = {
  render: () => ({
    template: `
      <sbb-expansion-panel>
        <sbb-expansion-panel-header>
          Panel with lazy loaded content
        </sbb-expansion-panel-header>
        <sbb-expansion-panel-content>
          <ng-template sbbExpansionPanelContent>
            <p>This content is only loaded when the panel is opened for the first time.</p>
            <p>This is useful for performance optimization when you have heavy content or expensive components.</p>
            <p>${longText}</p>
          </ng-template>
        </sbb-expansion-panel-content>
      </sbb-expansion-panel>
    `,
  }),
};
