import { SbbIconSidebarLink } from '@sbb-esta/lyne-angular/icon-sidebar';
import type { Args, ArgTypes, Meta } from '@storybook/angular';
import { argsToTemplate, componentWrapperDecorator } from '@storybook/angular';
import type { InputType } from 'storybook/internal/types';

const currentPage: InputType = {
  control: {
    type: 'boolean',
  },
};

const accessibilityCurrent: InputType = {
  control: false,
  table: { disable: true },
};

const download: InputType = {
  control: false,
  table: { disable: true },
};

const rel: InputType = {
  control: false,
  table: { disable: true },
};

const target: InputType = {
  control: false,
  table: { disable: true },
};

const argTypes: ArgTypes = {
  currentPage,
  accessibilityCurrent,
  download,
  rel,
  target,
};

const args: Args = {
  iconName: 'glass-cocktail-small',
  accessibilityLabel: 'Go to the party',
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
    template: `
      <sbb-icon-sidebar-link
        ${argsToTemplate(args)}
         [class.sbb-active]=${currentPage}
         accessibility-current=${currentPage ? 'page' : ''}
       ></sbb-icon-sidebar-link>
    `,
  }),
};
export default meta;

export const Default = {};
