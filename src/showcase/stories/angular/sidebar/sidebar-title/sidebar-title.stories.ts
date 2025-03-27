import { SbbSidebarTitle } from '@sbb-esta/lyne-angular/sidebar/sidebar-title';
import { Args, argsToTemplate, Meta } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

const level: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6],
};

const visualLevel: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6],
};

const argTypes: ArgTypes = {
  level,
  visualLevel,
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
