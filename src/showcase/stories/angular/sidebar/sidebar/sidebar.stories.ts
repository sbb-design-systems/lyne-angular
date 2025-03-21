import { SbbBlockLink } from '@sbb-esta/lyne-angular/link/block-link';
import { SbbLinkList } from '@sbb-esta/lyne-angular/link-list/link-list';
import { SbbSidebar } from '@sbb-esta/lyne-angular/sidebar/sidebar';
import { SbbSidebarCloseButton } from '@sbb-esta/lyne-angular/sidebar/sidebar-close-button';
import { SbbSidebarContainer } from '@sbb-esta/lyne-angular/sidebar/sidebar-container';
import { SbbSidebarContent } from '@sbb-esta/lyne-angular/sidebar/sidebar-content';
import { SbbSidebarTitle } from '@sbb-esta/lyne-angular/sidebar/sidebar-title';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, argsToTemplate, Meta, moduleMetadata } from '@storybook/angular';

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      // add slotted components or remove
      imports: [
        SbbSidebarContainer,
        SbbSidebarTitle,
        SbbSidebarCloseButton,
        SbbLinkList,
        SbbBlockLink,
        SbbSidebarContent,
      ],
    }),
  ],
  title: 'elements/sbb-sidebar/sbb-sidebar',
  component: SbbSidebar,
  parameters: {
    // add events or remove the 'action' object
    actions: { handles: ['click'] },
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-sidebar-container>
        <sbb-sidebar role="navigation" ${argsToTemplate(args)}>
          <sbb-sidebar-title>Sidebar Title</sbb-sidebar-title>
          <sbb-sidebar-close-button></sbb-sidebar-close-button>
          <sbb-link-list>
            <sbb-block-link href="#">Link 1</sbb-block-link>
            <sbb-block-link href="#" class="sbb-active" accessibility-current="page">
              Link 2
            </sbb-block-link>
          </sbb-link-list>
        </sbb-sidebar>
        <sbb-sidebar-content role="main">
          <p style="padding: var(--sbb-spacing-fixed-4x); margin: 0">
            In the enchanting world of fantasy, unicorns are legendary creatures known for their grace,
            purity, and magical abilities. These mystical beings have inspired countless tales of bravery
            and wonder. Here, we delve into some captivating unicorn success stories that continue to
            enchant and inspire, each with a touch of public transport magic.
          </p>
        </sbb-sidebar-content>
      </sbb-sidebar-container>
    `,
  }),
};
export default meta;

export const Default = {};
