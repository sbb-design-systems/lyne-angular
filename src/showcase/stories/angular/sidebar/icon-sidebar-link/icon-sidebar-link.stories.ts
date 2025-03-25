import { SbbIconSidebarLink } from '@sbb-esta/lyne-angular/sidebar/icon-sidebar-link';
import {
  Args,
  argsToTemplate,
  ArgTypes,
  componentWrapperDecorator,
  Meta,
} from '@storybook/angular';
import { InputType } from '@storybook/types';

const currentPage: InputType = {
  control: {
    type: 'boolean',
  },
};

const argTypes: ArgTypes = {
  currentPage,
};

const args: Args = {
  'icon-name': 'glass-cocktail-small',
  'accessibility-label': 'Go to the party',
  href: '#',
  currentPage: false,
};

const meta: Meta = {
  decorators: [
    componentWrapperDecorator(
      (story) => `<div style="max-width: var(--sbb-size-element-m)">
        <!-- The max-width is only set for storybook. Don't copy it. -->
        ${story}
      </div>`,
    ),
  ],
  title: 'elements/sbb-sidebar/sbb-icon-sidebar-link',
  component: SbbIconSidebarLink,
  argTypes,
  args,
  render: ({ currentPage, ...args }) => ({
    props: { currentPage, ...args },
    template: `<sbb-icon-sidebar-link
                ${argsToTemplate(args)}
                 [class.sbb-active]=${currentPage}
                 accessibility-current=${currentPage ? 'page' : ''}
               ></sbb-icon-sidebar-link>`,
  }),
};
export default meta;

export const Default = {};
