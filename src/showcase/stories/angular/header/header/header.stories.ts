import { SbbHeader } from '@sbb-esta/lyne-angular/header/header';
import { SbbHeaderButton } from '@sbb-esta/lyne-angular/header/header-button';
import { SbbHeaderLink } from '@sbb-esta/lyne-angular/header/header-link';
import { SbbLogo } from '@sbb-esta/lyne-angular/logo';
import { SbbMenu } from '@sbb-esta/lyne-angular/menu/menu';
import { SbbMenuButton } from '@sbb-esta/lyne-angular/menu/menu-button';
import { SbbSignet } from '@sbb-esta/lyne-angular/signet';
import { withActions } from '@storybook/addon-actions/decorator';
import { Meta, moduleMetadata } from '@storybook/angular';
import { InputType } from '@storybook/types';

import { spreadArgs } from '../../../../tools/spread-args';

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

const argTypes = { size };

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
  },
  argTypes,
  args,
  render: (args) => ({
    props: { ...args },
    template: `
      <sbb-header ${spreadArgs(args)}>
        <sbb-header-button icon-name="hamburger-menu-small" expand-from="small">
          Menu
        </sbb-header-button>
        ${args['size'] === 's' ? appName : ''}
        <div class="sbb-header-spacer"></div>
        <sbb-header-link
          href="https://www.sbb.ch"
          target="_blank"
          icon-name="magnifying-glass-small"
          class="sbb-active"
          accessibility-current="page"
        >
          Search
        </sbb-header-link>
        <sbb-header-button icon-name="user-small" class="sbb-header-shrinkable">
          Sign in
        </sbb-header-button>
        <sbb-header-button icon-name="globe-small" id="language-menu-trigger" class="last-element">
          English
        </sbb-header-button>
        <sbb-menu trigger="language-menu-trigger">
          <sbb-menu-button>Deutsch</sbb-menu-button>
          <sbb-menu-button>Français</sbb-menu-button>
          <sbb-menu-button>Italiano</sbb-menu-button>
          <sbb-menu-button icon-name="tick-small">English</sbb-menu-button>
        </sbb-menu>
        <div class="sbb-header-spacer sbb-header-spacer-logo"></div>
        ${
          args['size'] === 's'
            ? `
                <a aria-label="Homepage" href="/" class="sbb-header-logo">
                  <sbb-signet protective-room="panel"></sbb-signet>
                </a>
              `
            : `
                <a aria-label="Homepage" href="/" class="sbb-header-logo">
                  <sbb-logo protective-room="none"></sbb-logo>
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
