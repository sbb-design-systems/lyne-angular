import { SbbSidebarTitle } from '@sbb-esta/lyne-angular/sidebar/sidebar-title';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import type { ArgTypes, InputType } from 'storybook/internal/types';

const level: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6],
};

const visualLevel: InputType = {
  control: false,
  table: { disable: true },
};

const visuallyHidden: InputType = {
  control: false,
  table: { disable: true },
};

const argTypes: ArgTypes = {
  level,
  visualLevel,
  visuallyHidden,
};

const meta: Meta = {
  title: 'elements/sbb-sidebar/sbb-sidebar-title',
  component: SbbSidebarTitle,
  argTypes,
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-sidebar-title ${argsToTemplate(args)}>Sidebar title</sbb-sidebar-title>`,
  }),
};
export default meta;

export const Default = {};
