import { SbbHeader } from '@sbb-esta/lyne-angular/header/header';
import { SbbHeaderButton } from '@sbb-esta/lyne-angular/header/header-button';
import { SbbHeaderEnvironment } from '@sbb-esta/lyne-angular/header/header-environment';
import { SbbHeaderLink } from '@sbb-esta/lyne-angular/header/header-link';
import { SbbLogo } from '@sbb-esta/lyne-angular/logo';
import { SbbMenu } from '@sbb-esta/lyne-angular/menu/menu';
import { SbbMenuButton } from '@sbb-esta/lyne-angular/menu/menu-button';
import { SbbSignet } from '@sbb-esta/lyne-angular/signet';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import type { InputType } from 'storybook/internal/types';

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

const environment: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['dev', 'edu', 'int', 'loc', 'test', 'any'],
};

const argTypes = { environment };

const args = { environment: environment.options![0] };

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [
        SbbHeader,
        SbbHeaderLink,
        SbbHeaderButton,
        SbbMenu,
        SbbMenuButton,
        SbbSignet,
        SbbLogo,
      ],
    }),
  ],
  title: 'elements/sbb-header/sbb-header-environment',
  component: SbbHeaderEnvironment,
  argTypes,
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-header ${argsToTemplate(args)}>
        <sbb-header-button iconName="hamburger-menu-small" expandFrom="small">
          Menu
        </sbb-header-button>
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
         <a aria-label="Homepage" href="/" class="sbb-header-logo">
           <sbb-logo protectiveRoom="none"></sbb-logo>
         </a>
        <sbb-header-environment>${args['environment']}</sbb-header-environment>
      </sbb-header>
      <div class="sbb-page-spacing">
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
