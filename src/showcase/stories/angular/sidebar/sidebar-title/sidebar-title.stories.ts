import { SbbSidebarTitle } from '@sbb-esta/lyne-angular/sidebar/sidebar-title';
import { Args, argsToTemplate, Meta } from '@storybook/angular';

const meta: Meta = {
  title: 'elements/sbb-sidebar/sbb-sidebar-title',
  component: SbbSidebarTitle,
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-sidebar-title ${argsToTemplate(args)}>Sidebar title</sbb-sidebar-title>`,
  }),
};
export default meta;

export const Default = {};
