import { SbbActionGroup } from '@sbb-esta/lyne-angular/action-group';
import { SbbButton } from '@sbb-esta/lyne-angular/button/button';
import { SbbSecondaryButton } from '@sbb-esta/lyne-angular/button/secondary-button';
import { SbbContainer } from '@sbb-esta/lyne-angular/container/container';
import { SbbStickyBar } from '@sbb-esta/lyne-angular/container/sticky-bar';
import { SbbBlockLink } from '@sbb-esta/lyne-angular/link/block-link';
import { Args, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

const actionGroup = (): string => `
  <sbb-action-group
    align-group="stretch"
    orientation="vertical"
    horizontal-from="medium"
    style="width:100%;"
  >
    <sbb-block-link
      align-self="start"
      icon-name="chevron-small-left-small"
      href="https://www.sbb.ch/en/"
    >
      Link
    </sbb-block-link>
    <sbb-secondary-button>Cancel</sbb-secondary-button>
    <sbb-button>Confirm</sbb-button>
  </sbb-action-group>
`;

function isDark(colorArg: string): boolean {
  return colorArg === 'midnight' || colorArg === 'charcoal';
}

const containerContent = (title: string, isDark: boolean): string => `
  <sbb-title level="4" negative=${isDark}>${title}</sbb-title>
  <p class="sbb-text-s">The container component will give its content the correct spacing.</p>
  <p class="sbb-text-s">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
    voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  </p>
  <sbb-secondary-button style="margin-block-end: 0.75rem;">See more</sbb-secondary-button>
`;

const containerColor: InputType = {
  name: 'color',
  control: {
    type: 'select',
  },
  table: {
    category: 'Container',
  },
  options: ['transparent', 'white', 'milk', 'midnight', 'charcoal'],
};

const containerExpanded: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Container',
  },
};

const containerBackgroundExpanded: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Container',
  },
};

const color: InputType = {
  control: {
    type: 'select',
  },
  table: {
    category: 'Sticky Bar',
  },
  options: ['unset', 'white', 'milk', 'midnight', 'charcoal'],
};

const argTypes: ArgTypes = {
  color,
  containerColor,
  containerExpanded,
  containerBackgroundExpanded,
};

const args: Args = {
  color: color.options![0],
  containerColor: containerColor.options![0],
  containerExpanded: false,
  containerBackgroundExpanded: false,
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbActionGroup, SbbBlockLink, SbbButton, SbbContainer, SbbSecondaryButton],
    }),
  ],
  title: 'elements/sbb-container/sbb-sticky-bar',
  component: SbbStickyBar,
  argTypes,
  args,
  render: ({
    containerColor,
    containerExpanded,
    containerBackgroundExpanded,
    color,
    ...args
  }: Args) => ({
    props: { containerColor, containerExpanded, containerBackgroundExpanded, color, ...args },
    template: `
      <sbb-container
        color=${containerColor}
        expanded=${containerExpanded}
        background-expanded=${containerBackgroundExpanded}
      >
        ${containerContent('Example title', isDark(containerColor))}
        ${containerContent('Another one', isDark(containerColor))}
        ${containerContent('And another one', isDark(containerColor))}
        ${containerContent('And a last one', isDark(containerColor))}
        <sbb-sticky-bar ${color !== 'unset' ? `color=${color}` : ''}> ${actionGroup()} </sbb-sticky-bar>
      </sbb-container>
    `,
  }),
};
export default meta;

export const Default = {};
