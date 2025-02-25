import { SbbButton } from '@sbb-esta/lyne-angular/button/button';
import { SbbDivider } from '@sbb-esta/lyne-angular/divider';
import { SbbBlockLink } from '@sbb-esta/lyne-angular/link/block-link';
import { SbbMenu } from '@sbb-esta/lyne-angular/menu/menu';
import { SbbMenuButton } from '@sbb-esta/lyne-angular/menu/menu-button';
import { SbbMenuLink } from '@sbb-esta/lyne-angular/menu/menu-link';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

const userNameStyle =
  'fontWeight: bold; fontSize: var(--sbb-font-size-text-xs); marginTop: var(--sbb-spacing-fixed-1x)';

const userInfoStyle = 'color: var(--sbb-color-graphite); fontSize: var(--sbb-font-size-text-xxs)';

const iconName: InputType = {
  control: {
    type: 'text',
  },
};

const amount: InputType = {
  control: {
    type: 'text',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
};

const argTypes: ArgTypes = {
  iconName,
  amount,
  disabled,
};

const args: Args = {
  iconName: 'link-small',
  amount: '123',
  disabled: false,
};

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbButton, SbbBlockLink, SbbDivider, SbbMenuLink, SbbMenuButton],
    }),
  ],
  title: 'elements/sbb-menu/sbb-menu',
  component: SbbMenu,
  parameters: {
    actions: { handles: ['click'] },
  },
  argTypes,
  args,
  render: ({ iconName, amount, disabled }: Args) => ({
    props: { iconName, amount, disabled },
    template: `
      <sbb-button id="menu-trigger" size="m">Menu trigger</sbb-button>
      <sbb-menu trigger="menu-trigger">
        <div style="${userNameStyle}">Christina Müller</div>
        <span style="${userInfoStyle}">UIS9057</span>
        <sbb-block-link href="https://www.sbb.ch/en" target="_blank" negative size="xs"> Profile </sbb-block-link>
        <sbb-divider></sbb-divider>
        <sbb-menu-link ${iconName && `icon-name=${iconName}`} href="https://www.sbb.ch/en">View</sbb-menu-link>
        <sbb-menu-button icon-name="tickets-class-small" disabled=${disabled}>Tickets</sbb-menu-button>
        <sbb-menu-button icon-name="shopping-cart-small" amount=${amount}>Cart</sbb-menu-button>
        <sbb-divider></sbb-divider>
        <sbb-menu-button icon-name="exit-small">Log Out</sbb-menu-button>
      </sbb-menu>
    `,
  }),
};
export default meta;

export const Default = {};
