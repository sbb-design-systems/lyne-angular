import { SbbIconSidebarButton } from '@sbb-esta/lyne-angular/sidebar/icon-sidebar-button';
import { withActions } from '@storybook/addon-actions/decorator';
import {
  Args,
  argsToTemplate,
  ArgTypes,
  componentWrapperDecorator,
  Meta,
} from '@storybook/angular';
import { InputType } from '@storybook/types';

const type: InputType = {
  control: {
    type: 'select',
  },
  options: ['button', 'reset', 'submit'],
};

const value: InputType = {
  control: {
    type: 'text',
  },
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
  'aria-label': ariaLabel,
  currentPage,
  type,
  value,
};

const args: Args = {
  iconName: 'glass-cocktail-small',
  'aria-label': 'Go to the party',
  currentPage: false,
  type: type.options![0],
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
