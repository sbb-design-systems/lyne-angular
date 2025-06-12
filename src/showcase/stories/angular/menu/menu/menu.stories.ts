import { SbbButton } from '@sbb-esta/lyne-angular/button/button';
import { SbbDivider } from '@sbb-esta/lyne-angular/divider';
import { SbbBlockLink } from '@sbb-esta/lyne-angular/link/block-link';
import { SbbMenu } from '@sbb-esta/lyne-angular/menu/menu';
import { SbbMenuButton } from '@sbb-esta/lyne-angular/menu/menu-button';
import { SbbMenuLink } from '@sbb-esta/lyne-angular/menu/menu-link';
import type { Args, Meta } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';
import type { ArgTypes, InputType } from 'storybook/internal/types';

const userNameStyle =
  'fontWeight: bold; fontSize: var(--sbb-font-size-text-xs); marginTop: var(--sbb-spacing-fixed-1x)';

const userInfoStyle = 'color: var(--sbb-color-graphite); fontSize: var(--sbb-font-size-text-xxs)';

const iconName: InputType = {
  control: {
    type: 'text',
  },
};

const badge: InputType = {
  control: {
    type: 'text',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
};

const amount: InputType = {
  control: false,
  table: { disable: true },
};

const trigger: InputType = {
  control: false,
  table: { disable: true },
};

const listAccessibilityLabel: InputType = {
  control: false,
  table: { disable: true },
};

const argTypes: ArgTypes = {
  iconName,
  badge,
  amount,
  disabled,
  trigger,
  listAccessibilityLabel,
};

const args: Args = {
  iconName: 'link-small',
  badge: '9',
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
  render: ({ iconName, badge, disabled }: Args) => ({
    props: { iconName, badge, disabled },
    template: `
      <sbb-button id="menu-trigger" size="m">Menu trigger</sbb-button>
      <sbb-menu trigger="menu-trigger">
        <div style="${userNameStyle}">Christina Müller</div>
        <span style="${userInfoStyle}">UIS9057</span>
        <sbb-block-link href="https://www.sbb.ch/en" target="_blank" negative size="xs"> Profile </sbb-block-link>
        <sbb-divider></sbb-divider>
        <sbb-menu-link ${iconName && `[iconName]="iconName"`} href="https://www.sbb.ch/en">View</sbb-menu-link>
        <sbb-menu-button iconName="tickets-class-small" [disabled]="disabled">Tickets</sbb-menu-button>
        <sbb-menu-button iconName="shopping-cart-small" ${!disabled && badge ? `sbb-badge="${badge}"` : ''}>Cart</sbb-menu-button>
        <sbb-divider></sbb-divider>
        <sbb-menu-button iconName="exit-small">Log Out</sbb-menu-button>
      </sbb-menu>
    `,
  }),
};
export default meta;

export const Default = {};
