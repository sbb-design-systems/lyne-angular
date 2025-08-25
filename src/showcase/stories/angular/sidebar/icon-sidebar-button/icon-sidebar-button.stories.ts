import { SbbIconSidebarButton } from '@sbb-esta/lyne-angular/sidebar';
import type { Args, ArgTypes, Meta } from '@storybook/angular';
import { argsToTemplate, componentWrapperDecorator } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';
import type { InputType } from 'storybook/internal/types';

const type: InputType = {
  control: false,
  table: { disable: true },
};

const value: InputType = {
  control: false,
  table: { disable: true },
};

const form: InputType = {
  control: false,
  table: { disable: true },
};

const name: InputType = {
  control: false,
  table: { disable: true },
};

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

const currentPage: InputType = {
  control: {
    type: 'boolean',
  },
};

const argTypes: ArgTypes = {
  ariaLabel,
  currentPage,
  type,
  value,
  form,
  name,
};

const args: Args = {
  iconName: 'glass-cocktail-small',
  ariaLabel: 'Go to the party',
  currentPage: false,
};

const meta: Meta = {
  decorators: [
    withActions,
    componentWrapperDecorator(
      (story) => `<div style="max-width: var(--sbb-size-element-m)">
        <!-- The max-width is only set for storybook. Don't copy it. -->
        ${story}
      </div>`,
    ),
  ],
  title: 'elements/sbb-sidebar/sbb-icon-sidebar-button',
  component: SbbIconSidebarButton,
  parameters: {
    actions: { handles: ['click'] },
  },
  argTypes,
  args,
  render: ({ currentPage, ...args }) => ({
    props: { currentPage, ...args },
    template: `
      <sbb-icon-sidebar-button
         ${argsToTemplate(args)}
         [class.sbb-active]=${currentPage}
         aria-current=${currentPage ? 'page' : ''}
       ></sbb-icon-sidebar-button>
    `,
  }),
};
export default meta;

export const Default = {};
