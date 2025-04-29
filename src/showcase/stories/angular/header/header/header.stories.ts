import { SbbHeader } from '@sbb-esta/lyne-angular/header/header';
import { SbbHeaderButton } from '@sbb-esta/lyne-angular/header/header-button';
import { SbbHeaderLink } from '@sbb-esta/lyne-angular/header/header-link';
import { SbbLogo } from '@sbb-esta/lyne-angular/logo';
import { SbbMenu } from '@sbb-esta/lyne-angular/menu/menu';
import { SbbMenuButton } from '@sbb-esta/lyne-angular/menu/menu-button';
import { SbbSignet } from '@sbb-esta/lyne-angular/signet';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import type { InputType } from '@storybook/types';

const LoremIpsumTemplate = `
  <div>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet malesuada augue. Morbi
    eget tristique nisl, sit amet dapibus erat. Donec tempor, metus et aliquam ultrices, nulla mi
    mollis urna, a lacinia mauris risus mattis massa. Quisque cursus sollicitudin enim in malesuada.
    Maecenas nec hendrerit augue. Duis porttitor mattis molestie. Sed imperdiet velit at dui
    ultrices, viverra scelerisque nisi dapibus. Nulla urna lectus, gravida eu dapibus vel, mattis
    non turpis. Nunc interdum et justo sed faucibus. Vestibulum interdum commodo mi, sed eleifend
    odio posuere in. Nunc non dui venenatis, eleifend est ut, varius odio. Quisque augue ante,
    mollis eu lorem id, commodo cursus risus.
  </div>
  <br />
`;

const appName = `
  <span class="sbb-header-info">
    <strong>Name</strong>
    <span>V. 1.1</span>
  </span>
`;

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's'],
};

const scrollOrigin: InputType = {
  control: false,
  table: {
    disable: true,
  },
};

const argTypes = { size, scrollOrigin };

const args = { size: size.options![0] };

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbHeaderLink, SbbHeaderButton, SbbMenu, SbbMenuButton, SbbSignet, SbbLogo],
    }),
  ],
  title: 'elements/sbb-header/sbb-header',
  component: SbbHeader,
  parameters: {
    actions: { handles: ['click'] },
    layout: 'fullscreen',
  },
  argTypes,
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-header ${argsToTemplate(args)}>
        <sbb-header-button iconName="hamburger-menu-small" expandFrom="small">
          Menu
        </sbb-header-button>
        ${args['size'] === 's' ? appName : ''}
        <div class="sbb-header-spacer"></div>
        <sbb-header-link
          href="https://www.sbb.ch"
          target="_blank"
          iconName="magnifying-glass-small"
          class="sbb-active"
          accessibility-current="page"
        >
          Search
        </sbb-header-link>
        <sbb-header-button iconName="user-small" class="sbb-header-shrinkable">
          Sign in
        </sbb-header-button>
        <sbb-header-button iconName="globe-small" id="language-menu-trigger" class="last-element">
          English
        </sbb-header-button>
        <sbb-menu trigger="language-menu-trigger">
          <sbb-menu-button>Deutsch</sbb-menu-button>
          <sbb-menu-button>Français</sbb-menu-button>
          <sbb-menu-button>Italiano</sbb-menu-button>
          <sbb-menu-button iconName="tick-small">English</sbb-menu-button>
        </sbb-menu>
        <div class="sbb-header-spacer sbb-header-spacer-logo"></div>
        ${
          args['size'] === 's'
            ? `
                <a aria-label="Homepage" href="/" class="sbb-header-logo">
                  <sbb-signet protectiveRoom="panel"></sbb-signet>
                </a>
              `
            : `
                <a aria-label="Homepage" href="/" class="sbb-header-logo">
                  <sbb-logo protectiveRoom="none"></sbb-logo>
                </a>
              `
        }
      </sbb-header>
      <div class=${args['expanded'] ? `sbb-page-spacing-expanded` : `sbb-page-spacing`}>
        ${new Array(12)
          .fill(null)
          .map(() => LoremIpsumTemplate)
          .join('')}
      </div>
    `,
  }),
};
export default meta;

export const Default = {};
