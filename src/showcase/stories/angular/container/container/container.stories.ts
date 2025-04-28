import { SbbSecondaryButton } from '@sbb-esta/lyne-angular/button/secondary-button';
import { SbbCard } from '@sbb-esta/lyne-angular/card/card';
import { SbbContainer } from '@sbb-esta/lyne-angular/container/container';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import type { ArgTypes, InputType } from '@storybook/types';

function isDark(colorArg: string): boolean {
  return colorArg === 'midnight' || colorArg === 'charcoal';
}

const containerContent = (title: string, isDark: boolean, last = false): string => `
  <sbb-title level="4" negative=${isDark}>${title}</sbb-title>
  <p class="sbb-text-s">The container component will give its content the correct spacing.</p>
  <p class="sbb-text-s">
    ${
      isDark
        ? `
        In <code>"midnight"</code> and <code>"charcoal"</code> variants the slotted text has
        <code>"white"</code> color; however, you have to manually set the
        <code>"negative"</code> property on sbb-components when needed.
      `
        : `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      `
    }
  </p>
  <sbb-secondary-button style="${last ? 'margin-block-end: 3rem;' : ''}">
    See more
  </sbb-secondary-button>
`;

const color: InputType = {
  control: {
    type: 'select',
  },
  options: ['white', 'transparent', 'milk', 'midnight', 'charcoal'],
};

const argTypes: ArgTypes = {
  color,
};

const args: Args = {
  color: color.options![0],
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbTitle, SbbSecondaryButton, SbbCard],
    }),
  ],
  title: 'elements/sbb-container/sbb-container',
  component: SbbContainer,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes,
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-container ${argsToTemplate(args)}>
        ${containerContent('Example title', isDark(args['color']))}
        ${containerContent('Another one', isDark(args['color']))}
        ${containerContent('And another one', isDark(args['color']), true)}
      </sbb-container>`,
  }),
};
export default meta;

export const Default = {};
