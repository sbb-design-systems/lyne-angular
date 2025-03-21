import { SbbIconSidebar } from '@sbb-esta/lyne-angular/sidebar/icon-sidebar';
import { SbbIconSidebarContainer } from '@sbb-esta/lyne-angular/sidebar/icon-sidebar-container';
import { SbbIconSidebarContent } from '@sbb-esta/lyne-angular/sidebar/icon-sidebar-content';
import { SbbIconSidebarLink } from '@sbb-esta/lyne-angular/sidebar/icon-sidebar-link';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, argsToTemplate, Meta, moduleMetadata } from '@storybook/angular';

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      // add slotted components or remove
      imports: [SbbIconSidebarContainer, SbbIconSidebarContent, SbbIconSidebarLink],
    }),
  ],
  title: 'elements/sbb-sidebar/sbb-icon-sidebar',
  component: SbbIconSidebar,
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-icon-sidebar-container>
        <sbb-icon-sidebar ${argsToTemplate(args)}>
          <sbb-icon-sidebar-link [icon-name]="unicorn-small" aria-label="Unicorn" href="#"></sbb-icon-sidebar-link>
          <sbb-icon-sidebar-link [icon-name]="unicorn-small" aria-label="Unicorn" class="sbb-active" href="#"></sbb-icon-sidebar-link>
        </sbb-icon-sidebar>
        <sbb-sidebar-content>Content</sbb-sidebar-content>
      </sbb-icon-sidebar-container>`,
  }),
};
export default meta;

export const Default = {};
