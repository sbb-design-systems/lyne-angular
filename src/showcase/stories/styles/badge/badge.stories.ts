import { SbbIcon } from '@sbb-esta/lyne-angular/icon';
import { Args, Meta, StoryObj } from '@storybook/angular';
import type { ArgTypes, InputType } from '@storybook/types';

const badgeContent: InputType = {
  control: {
    type: 'text',
  },
};

const badgePosition: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['before', 'after'],
};

const argTypes: ArgTypes = {
  badgeContent,
  badgePosition,
};

const args: Args = {
  badgeContent: '3',
  badgePosition: 'after',
};

const BadgeOnIconTemplate = ({ badgeContent, badgePosition }: Args): string => `
  <sbb-icon
    sbb-badge=${badgeContent}
    sbb-badge-position=${badgePosition}
    name="controls-small"
  ></sbb-icon>
`;

const BadgeOnHeaderButtonTemplate = ({ badgeContent, badgePosition }: Args): string => `
  <sbb-header-button>
    <sbb-icon
      slot="icon"
      sbb-badge=${badgeContent}
      sbb-badge-position=${badgePosition}
      name="user-small"
    ></sbb-icon>
    User menu
  </sbb-header-button>
`;

export const BadgeOnIcon: StoryObj = {
  render: ({ ...args }: Args) => ({
    props: { ...args },
    template: BadgeOnIconTemplate(args),
  }),
};

export const BadgeOnIconBefore: StoryObj = {
  render: ({ ...args }: Args) => ({
    props: { ...args },
    template: BadgeOnIconTemplate(args),
  }),
  args: { ...args, badgePosition: 'before' },
};

export const BadgeOnHeaderButton: StoryObj = {
  render: ({ ...args }: Args) => ({
    props: { ...args },
    template: BadgeOnHeaderButtonTemplate(args),
  }),
};

const meta: Meta = {
  title: 'styles/badge',
  component: SbbIcon,
  argTypes,
  args,
};

export default meta;
